import { FileOptimizer } from './optimizerUtils';

interface StoredImage {
    id: string;
    name: string;
    data: string;
    timestamp: number;
    width?: number;
    height?: number;
}

// Helper to generate unique IDs
const generateId = (): string => {
    return `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Helper to get image dimensions from base64
const getImageDimensions = (base64: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            resolve({
                width: img.width,
                height: img.height
            });
        };
        img.src = base64;
    });
};

// Helper to convert File to base64
const imageToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const storeImage = async (image: File | string): Promise<string> => {
    try {
        let base64Data: string;
        let imageName: string;

        if (image instanceof File) {
            // Optimize image if it's a File
            const optimizationResult = await FileOptimizer.optimizeImage(image, {
                maxWidth: 1920,
                maxHeight: 1080,
                quality: 0.8
            });

            // Convert optimized image to base64
            const optimizedFile = new File(
                [optimizationResult.optimizedFile],
                image.name,
                { type: image.type }
            );
            base64Data = await imageToBase64(optimizedFile);
            imageName = image.name;

            console.log(`Image optimized: ${(optimizationResult.originalSize / 1024 / 1024).toFixed(2)}MB -> ${(optimizationResult.optimizedSize / 1024 / 1024).toFixed(2)}MB`);
        } else {
            // If it's already a base64 string
            base64Data = image;
            imageName = 'image';
        }

        // Get image dimensions
        const dimensions = await getImageDimensions(base64Data);

        // Create storage object
        const storedImage: StoredImage = {
            id: generateId(),
            name: imageName,
            data: base64Data,
            timestamp: Date.now(),
            width: dimensions.width,
            height: dimensions.height
        };

        // Store in localStorage
        localStorage.setItem(`img_${storedImage.id}`, JSON.stringify(storedImage));
        
        return storedImage.id;
    } catch (error) {
        console.error('Error storing image:', error);
        throw error;
    }
};

export const getImage = (imageId: string): string | null => {
    try {
        const storedImageJson = localStorage.getItem(`img_${imageId}`);
        if (!storedImageJson) return null;

        const storedImage: StoredImage = JSON.parse(storedImageJson);
        return storedImage.data;
    } catch (error) {
        console.error('Error retrieving image:', error);
        return null;
    }
};

export const removeImage = (imageId: string): boolean => {
    try {
        localStorage.removeItem(`img_${imageId}`);
        return true;
    } catch (error) {
        console.error('Error removing image:', error);
        return false;
    }
};

export const getAllImages = (): StoredImage[] => {
    const images: StoredImage[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('img_')) {
            try {
                const imageJson = localStorage.getItem(key);
                if (imageJson) {
                    images.push(JSON.parse(imageJson));
                }
            } catch (error) {
                console.error('Error parsing image:', error);
            }
        }
    }
    return images.sort((a, b) => b.timestamp - a.timestamp);
};

export const clearOldImages = (daysOld: number = 30): void => {
    const now = Date.now();
    const maxAge = daysOld * 24 * 60 * 60 * 1000;

    getAllImages().forEach(image => {
        if (now - image.timestamp > maxAge) {
            removeImage(image.id);
        }
    });
};

// Get total image storage usage
export const getImageStorageUsage = (): { used: number, total: number } => {
    let used = 0;
    getAllImages().forEach(image => {
        used += image.data.length * 2; // Approximate size in bytes
    });
    
    return {
        used: used / (1024 * 1024), // Convert to MB
        total: 10 * 1024 // Approximate localStorage limit (usually around 5-10MB)
    };
};

// Get image dimensions
export const getImageDimensionsById = (imageId: string): { width: number; height: number } | null => {
    try {
        const storedImageJson = localStorage.getItem(`img_${imageId}`);
        if (!storedImageJson) return null;

        const storedImage: StoredImage = JSON.parse(storedImageJson);
        return {
            width: storedImage.width || 0,
            height: storedImage.height || 0
        };
    } catch (error) {
        console.error('Error getting image dimensions:', error);
        return null;
    }
};
