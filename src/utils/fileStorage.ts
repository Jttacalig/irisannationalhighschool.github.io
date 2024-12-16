import { FileOptimizer } from './optimizerUtils';

// Helper to generate unique IDs
const generateId = (): string => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Helper to convert File to base64
const fileToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

// Helper to convert base64 to File
const base64ToFile = (base64: string, fileName: string, type: string): File => {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || type;
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
};

interface StoredFile {
    id: string;
    name: string;
    type: string;
    data: string;
    timestamp: number;
}

export const storeFile = async (file: File): Promise<string> => {
    try {
        // Optimize file if needed
        const optimizationResult = file.type.startsWith('image/')
            ? await FileOptimizer.optimizeImage(file)
            : await FileOptimizer.optimizeFile(file);
        
        const optimizedFile = new File(
            [optimizationResult.optimizedFile],
            file.name,
            { type: file.type }
        );

        // Convert to base64
        const base64Data = await fileToBase64(optimizedFile);
        
        // Create storage object
        const storedFile: StoredFile = {
            id: generateId(),
            name: file.name,
            type: file.type,
            data: base64Data,
            timestamp: Date.now()
        };

        // Store in localStorage
        localStorage.setItem(`file_${storedFile.id}`, JSON.stringify(storedFile));
        
        console.log(`File stored successfully. Original size: ${(file.size / 1024 / 1024).toFixed(2)}MB, Optimized size: ${(optimizationResult.optimizedSize / 1024 / 1024).toFixed(2)}MB`);
        
        return storedFile.id;
    } catch (error) {
        console.error('Error storing file:', error);
        throw error;
    }
};

export const getFile = (fileId: string): File | null => {
    try {
        const storedFileJson = localStorage.getItem(`file_${fileId}`);
        if (!storedFileJson) return null;

        const storedFile: StoredFile = JSON.parse(storedFileJson);
        return base64ToFile(storedFile.data, storedFile.name, storedFile.type);
    } catch (error) {
        console.error('Error retrieving file:', error);
        return null;
    }
};

export const getFileUrl = (fileId: string): string | null => {
    try {
        const storedFileJson = localStorage.getItem(`file_${fileId}`);
        if (!storedFileJson) return null;

        const storedFile: StoredFile = JSON.parse(storedFileJson);
        return storedFile.data;
    } catch (error) {
        console.error('Error retrieving file URL:', error);
        return null;
    }
};

export const removeFile = (fileId: string): boolean => {
    try {
        localStorage.removeItem(`file_${fileId}`);
        return true;
    } catch (error) {
        console.error('Error removing file:', error);
        return false;
    }
};

export const getAllFiles = (): StoredFile[] => {
    const files: StoredFile[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('file_')) {
            try {
                const fileJson = localStorage.getItem(key);
                if (fileJson) {
                    files.push(JSON.parse(fileJson));
                }
            } catch (error) {
                console.error('Error parsing file:', error);
            }
        }
    }
    return files.sort((a, b) => b.timestamp - a.timestamp);
};

export const clearOldFiles = (daysOld: number = 30): void => {
    const now = Date.now();
    const maxAge = daysOld * 24 * 60 * 60 * 1000;

    getAllFiles().forEach(file => {
        if (now - file.timestamp > maxAge) {
            removeFile(file.id);
        }
    });
};

// Get total storage usage
export const getStorageUsage = (): { used: number, total: number } => {
    let used = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('file_')) {
            const value = localStorage.getItem(key);
            if (value) {
                used += value.length * 2; // Approximate size in bytes
            }
        }
    }
    
    return {
        used: used / (1024 * 1024), // Convert to MB
        total: 10 * 1024 // Approximate localStorage limit (usually around 5-10MB)
    };
};
