interface OptimizationOptions {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    maxSizeInMB?: number;
}

interface OptimizationResult {
    optimizedFile: File | Blob;
    originalSize: number;
    optimizedSize: number;
    compressionRatio: number;
}

export class FileOptimizer {
    private static readonly DEFAULT_IMAGE_OPTIONS: OptimizationOptions = {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.8,
        maxSizeInMB: 2
    };

    private static readonly DEFAULT_FILE_OPTIONS: OptimizationOptions = {
        maxSizeInMB: 10
    };

    private static readonly COMPRESSIBLE_IMAGE_TYPES = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp'
    ];

    private static readonly COMPRESSIBLE_FILE_TYPES = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    /**
     * Optimize an image file before upload
     */
    static async optimizeImage(
        file: File,
        options: OptimizationOptions = {}
    ): Promise<OptimizationResult> {
        const opts = { ...this.DEFAULT_IMAGE_OPTIONS, ...options };

        if (!this.COMPRESSIBLE_IMAGE_TYPES.includes(file.type)) {
            throw new Error('Unsupported image type');
        }

        return new Promise((resolve, reject) => {
            const img = new Image();
            const reader = new FileReader();

            reader.onload = (e) => {
                img.src = e.target?.result as string;
                img.onload = async () => {
                    try {
                        const optimizedBlob = await this.compressImage(img, file.type, opts);
                        const result: OptimizationResult = {
                            optimizedFile: optimizedBlob,
                            originalSize: file.size,
                            optimizedSize: optimizedBlob.size,
                            compressionRatio: (optimizedBlob.size / file.size) * 100
                        };
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                };
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    /**
     * Optimize a general file before upload
     */
    static async optimizeFile(
        file: File,
        options: OptimizationOptions = {}
    ): Promise<OptimizationResult> {
        const opts = { ...this.DEFAULT_FILE_OPTIONS, ...options };

        // For now, just check file size and type
        if (file.size > (opts.maxSizeInMB || 10) * 1024 * 1024) {
            throw new Error(`File size exceeds ${opts.maxSizeInMB}MB limit`);
        }

        // Return original file if it's not a compressible type or already within limits
        return {
            optimizedFile: file,
            originalSize: file.size,
            optimizedSize: file.size,
            compressionRatio: 100
        };
    }

    /**
     * Compress image using canvas
     */
    private static async compressImage(
        img: HTMLImageElement,
        type: string,
        options: OptimizationOptions
    ): Promise<Blob> {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('Canvas context not available');
        }

        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img;
        if (width > options.maxWidth!) {
            height *= options.maxWidth! / width;
            width = options.maxWidth!;
        }
        if (height > options.maxHeight!) {
            width *= options.maxHeight! / height;
            height = options.maxHeight!;
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw and compress image
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob with specified quality
        return await this.canvasToBlob(canvas, type, options.quality || 0.8);
    }

    /**
     * Convert canvas to blob with proper type handling
     */
    private static canvasToBlob(
        canvas: HTMLCanvasElement,
        type: string,
        quality: number
    ): Promise<Blob> {
        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Failed to convert canvas to blob'));
                    }
                },
                type,
                quality
            );
        });
    }

    /**
     * Check if file needs optimization
     */
    static needsOptimization(file: File, options: OptimizationOptions = {}): boolean {
        const opts = file.type.startsWith('image/') 
            ? { ...this.DEFAULT_IMAGE_OPTIONS, ...options }
            : { ...this.DEFAULT_FILE_OPTIONS, ...options };

        return file.size > (opts.maxSizeInMB || 10) * 1024 * 1024;
    }
}
