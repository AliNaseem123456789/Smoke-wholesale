from PIL import Image
import os
import time

def convert_images_to_jpg(folder_path, quality=95):
    """
    Convert all WebP and PNG files to JPG in folder and subfolders
    
    Args:
        folder_path: Root folder to process
        quality: JPG quality (1-100), 95 is recommended
    """
    # Supported extensions (case-insensitive)
    supported_exts = ('.webp', '.png', '.PNG', '.WEBP')
    
    total_converted = 0
    total_errors = 0
    start_time = time.time()
    
    # Count files first
    print("Scanning for WebP and PNG files...")
    all_files = []
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.lower().endswith(('.webp', '.png')):
                all_files.append(os.path.join(root, file))
    
    print(f"Found {len(all_files)} WebP/PNG files to convert")
    print("-" * 50)
    
    # Convert files
    for i, img_path in enumerate(all_files, 1):
        # Create JPG path (replace extension)
        jpg_path = os.path.splitext(img_path)[0] + '.jpg'
        
        # Skip if JPG already exists
        if os.path.exists(jpg_path):
            print(f"⚠ Skipping (JPG exists): {os.path.basename(img_path)}")
            continue
            
        try:
            with Image.open(img_path) as img:
                original_mode = img.mode
                
                # Handle transparency/alpha channel
                if img.mode in ('RGBA', 'LA', 'P'):
                    # Create white background for transparent images
                    if img.mode == 'P' and 'transparency' in img.info:
                        # Convert palette with transparency
                        img = img.convert('RGBA')
                    
                    # Create white background
                    rgb_img = Image.new('RGB', img.size, (255, 255, 255))
                    
                    # Paste with alpha mask if available
                    if img.mode == 'RGBA':
                        rgb_img.paste(img, mask=img.split()[3])  # Use alpha channel
                    elif img.mode == 'LA':
                        rgb_img.paste(img, mask=img.split()[1])  # Use alpha from LA
                    else:
                        rgb_img.paste(img)  # No alpha
                    
                    img = rgb_img
                elif img.mode == 'L':  # Grayscale
                    # Convert grayscale to RGB
                    img = img.convert('RGB')
                
                # Save as JPG
                img.save(jpg_path, 'JPEG', quality=quality, optimize=True)
                
                total_converted += 1
                
                # Print progress every 20 files
                if i % 20 == 0:
                    print(f"Progress: {i}/{len(all_files)} - {total_converted} converted")
                elif i <= 10 or i >= len(all_files) - 5:
                    # Show first 10 and last 5 files
                    print(f"✓ [{original_mode}] {os.path.basename(img_path)} → {os.path.basename(jpg_path)}")
                    
        except Exception as e:
            total_errors += 1
            filename = os.path.basename(img_path)
            print(f"✗ Error converting {filename}: {str(e)[:60]}...")
    
    # Summary
    elapsed = time.time() - start_time
    print("\n" + "=" * 60)
    print("CONVERSION SUMMARY:")
    print(f"Total files found: {len(all_files)}")
    print(f"Successfully converted: {total_converted}")
    print(f"Already existed (skipped): {len(all_files) - total_converted - total_errors}")
    print(f"Errors: {total_errors}")
    print(f"Time taken: {elapsed:.1f} seconds")
    
    if total_converted > 0:
        print(f"Average: {elapsed/total_converted:.2f} seconds per file")
        print(f"JPG quality: {quality}%")
    
    print("=" * 60)
    
    # Optional: Ask about deleting originals
    if total_converted > 0:
        response = input("\nDelete original WebP/PNG files? (y/N): ").strip().lower()
        if response == 'y':
            delete_originals(folder_path, all_files, total_errors)

def delete_originals(folder_path, converted_files, error_count):
    """Delete original files after successful conversion"""
    deleted = 0
    for img_path in converted_files:
        jpg_path = os.path.splitext(img_path)[0] + '.jpg'
        if os.path.exists(jpg_path):
            try:
                os.remove(img_path)
                deleted += 1
            except Exception as e:
                print(f"Could not delete {os.path.basename(img_path)}: {e}")
    
    print(f"\nDeleted {deleted} original files")
    print(f"Freed up space, kept {error_count} files with errors")

def get_folder_size(folder_path):
    """Calculate total size of WebP/PNG files"""
    total_size = 0
    total_files = 0
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.lower().endswith(('.webp', '.png')):
                filepath = os.path.join(root, file)
                total_size += os.path.getsize(filepath)
                total_files += 1
    
    # Convert to readable format
    for unit in ['B', 'KB', 'MB', 'GB']:
        if total_size < 1024.0:
            return f"{total_size:.1f} {unit}", total_files
        total_size /= 1024.0
    
    return f"{total_size:.1f} TB", total_files

if __name__ == "__main__":
    print("=" * 60)
    print("WEBP/PNG TO JPG BATCH CONVERTER")
    print("=" * 60)
    
    # Get folder path
    folder_path = input("Enter folder path (or press Enter for current folder): ").strip('" ')
    
    if not folder_path:
        folder_path = "."  # Current directory
    
    if not os.path.exists(folder_path):
        print(f"Error: Folder '{folder_path}' does not exist!")
        exit(1)
    
    # Show folder info
    size_str, file_count = get_folder_size(folder_path)
    print(f"\nTarget folder: {os.path.abspath(folder_path)}")
    print(f"Estimated WebP/PNG files: {file_count}")
    print(f"Estimated size: {size_str}")
    
    # Ask for quality
    quality = input("\nJPG quality (1-100, default 95): ").strip()
    if not quality:
        quality = 95
    else:
        try:
            quality = int(quality)
            if quality < 1 or quality > 100:
                print("Using default quality 95")
                quality = 95
        except:
            quality = 95
    
    # Confirm
    print(f"\nWill convert WebP and PNG files to JPG (quality: {quality}%)")
    confirm = input("Start conversion? (Y/n): ").strip().lower()
    
    if confirm in ('', 'y', 'yes'):
        print("\nStarting conversion...")
        convert_images_to_jpg(folder_path, quality)
    else:
        print("Conversion cancelled.")