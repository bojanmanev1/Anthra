/**
 * ANTHRA - Supabase Backend Configuration & Helper Library
 * Powers the Gallery CMS and Admin Dashboard
 */

// Default configuration keys (connected to Anthra Supabase project)
const DEFAULT_SUPABASE_CONFIG = {
  url: 'https://phbeivajcnmofgvlzfle.supabase.co',
  anonKey: 'sb_publishable_scqHqp33GcBXMazC6e7CDA_jXma1rZK'
};

// Check if credentials have been saved in localStorage by the admin
function getSupabaseConfig() {
  const savedUrl = localStorage.getItem('anthra_supabase_url');
  const savedKey = localStorage.getItem('anthra_supabase_key');
  return {
    url: (savedUrl && savedUrl.trim()) || DEFAULT_SUPABASE_CONFIG.url,
    anonKey: (savedKey && savedKey.trim()) || DEFAULT_SUPABASE_CONFIG.anonKey
  };
}

const config = getSupabaseConfig();
const isConfigured = Boolean(
  config.url &&
  config.url.startsWith('https://') &&
  !config.url.includes('xyzcompany') &&
  config.anonKey &&
  config.anonKey !== 'eyJh...'
);

// Initialize Supabase Client if SDK is loaded
let supabaseClient = null;
if (window.supabase && typeof window.supabase.createClient === 'function' && isConfigured) {
  try {
    supabaseClient = window.supabase.createClient(config.url, config.anonKey);
  } catch (err) {
    console.warn('Anthra: Failed to initialize Supabase client:', err);
  }
}

// LocalStorage Fallback Storage for seamless offline / demo mode
const LOCAL_STORAGE_PROJECTS_KEY = 'anthra_demo_gallery_projects';

function getLocalProjects() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalProjects(projects) {
  localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(projects));
}

/**
 * Client-side image compressor:
 * Resizes huge smartphone photos (e.g. 15MB 4K photos) down to a crisp, optimized web size (max 1600px, ~250KB)
 * Saves 90% bandwidth and makes uploads lightning-fast even on mobile data.
 */
function compressImage(file, maxWidth = 1600, quality = 0.85) {
  return new Promise((resolve, reject) => {
    // If SVG or non-image, return as-is
    if (!file.type.startsWith('image/') || file.type.includes('svg')) {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve(file);
            const optimizedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(optimizedFile);
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
}

// Global AnthraCMS API exposed to both index.html and admin.html
window.AnthraCMS = {
  isConfigured: () => isConfigured,
  
  getConfig: () => getSupabaseConfig(),
  
  saveConfig: (url, anonKey) => {
    if (url) localStorage.setItem('anthra_supabase_url', url.trim());
    if (anonKey) localStorage.setItem('anthra_supabase_key', anonKey.trim());
  },

  clearConfig: () => {
    localStorage.removeItem('anthra_supabase_url');
    localStorage.removeItem('anthra_supabase_key');
  },

  // Auth: Login
  login: async (email, password) => {
    if (supabaseClient) {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data.user;
    } else {
      // Demo authentication mode if keys not yet configured
      if (email === 'anthrabau@gmail.com' && password === 'anthra2026') {
        const demoUser = { id: 'demo-admin-id', email: 'anthrabau@gmail.com', role: 'admin' };
        sessionStorage.setItem('anthra_demo_session', JSON.stringify(demoUser));
        return demoUser;
      }
      throw new Error('Неточен е-маил или лозинка (За демо проба: anthrabau@gmail.com / anthra2026)');
    }
  },

  // Auth: Logout
  logout: async () => {
    sessionStorage.removeItem('anthra_demo_session');
    if (supabaseClient) {
      await supabaseClient.auth.signOut();
    }
  },

  // Auth: Get Current Active User
  getUser: async () => {
    if (supabaseClient) {
      const { data: { user } } = await supabaseClient.auth.getUser();
      return user;
    }
    const demo = sessionStorage.getItem('anthra_demo_session');
    return demo ? JSON.parse(demo) : null;
  },

  // Fetch all projects for the gallery
  getProjects: async () => {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
      } catch (err) {
        console.warn('Anthra: Error fetching from Supabase, falling back to local:', err);
      }
    }
    return getLocalProjects();
  },

  // Add a new project
  addProject: async (projectData, rawFile) => {
    // 1. Optimize image in browser
    const optimizedFile = await compressImage(rawFile);
    let imageUrl = '';
    let storagePath = '';

    if (supabaseClient) {
      // Generate clean filename
      const fileExt = optimizedFile.name.split('.').pop() || 'jpg';
      const cleanFileName = `project_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      storagePath = cleanFileName;

      // Upload to public 'gallery' bucket
      const { data: uploadData, error: uploadError } = await supabaseClient
        .storage
        .from('gallery')
        .upload(cleanFileName, optimizedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw new Error('Грешка при прикачување на сликата: ' + uploadError.message);

      // Get public URL
      const { data: urlData } = supabaseClient
        .storage
        .from('gallery')
        .getPublicUrl(cleanFileName);

      imageUrl = urlData.publicUrl;
      if (projectData.image_fit === 'contain') {
        imageUrl += '#fit=contain';
      }

      // Insert record into 'projects' table
      const { data, error: insertError } = await supabaseClient
        .from('projects')
        .insert([{
          title: projectData.title,
          category: projectData.category,
          category_label: projectData.category_label || projectData.category,
          description: projectData.description,
          image_url: imageUrl,
          storage_path: storagePath,
          created_at: new Date().toISOString()
        }])
        .select();

      if (insertError) throw new Error('Грешка при зачувување во базата: ' + insertError.message);
      return data && data[0];
    } else {
      // LocalStorage / Demo Mode fallback (DataURL storage)
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(optimizedFile);
        reader.onload = () => {
          let demoUrl = reader.result;
          if (projectData.image_fit === 'contain') {
            demoUrl += '#fit=contain';
          }
          const newProject = {
            id: 'local_' + Date.now(),
            title: projectData.title,
            category: projectData.category,
            category_label: projectData.category_label || projectData.category,
            description: projectData.description,
            image_url: demoUrl,
            image_fit: projectData.image_fit || 'cover',
            storage_path: 'local',
            created_at: new Date().toISOString()
          };
          const list = getLocalProjects();
          list.unshift(newProject);
          saveLocalProjects(list);
          resolve(newProject);
        };
      });
    }
  },

  // Delete a project
  deleteProject: async (project) => {
    if (supabaseClient && project.id && !String(project.id).startsWith('local_')) {
      // 1. Delete image from Storage if exists
      if (project.storage_path && project.storage_path !== 'local') {
        try {
          await supabaseClient.storage.from('gallery').remove([project.storage_path]);
        } catch (e) {
          console.warn('Storage delete error:', e);
        }
      }

      // 2. Delete database row
      const { error } = await supabaseClient
        .from('projects')
        .delete()
        .eq('id', project.id);

      if (error) throw error;
      return true;
    } else {
      // LocalStorage delete
      const list = getLocalProjects().filter(p => p.id !== project.id);
      saveLocalProjects(list);
      return true;
    }
  }
};
