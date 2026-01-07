from PIL import Image
import os

ROOT_FOLDER = r"E:\Work\smokez\Wholesale Smoke Shop Website\public\product-images"

# Loop through all folders inside ROOT_FOLDER
for folder in os.listdir(ROOT_FOLDER):
    folder_path = os.path.join(ROOT_FOLDER, folder)
    
    if not os.path.isdir(folder_path):
        continue  # skip files, only process folders
    
    for file in os.listdir(folder_path):
        file_path = os.path.join(folder_path, file)
        if not os.path.isfile(file_path):
            continue
        
        # Skip if already webp
        if file.lower().endswith(".webp"):
            continue
        
        try:
            img = Image.open(file_path)
            # Convert to RGB if PNG with alpha to avoid transparency issues
            if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                img = img.convert("RGBA")
            else:
                img = img.convert("RGB")
            
            webp_path = os.path.splitext(file_path)[0] + ".webp"
            img.save(webp_path, "WEBP", quality=80)  # adjust quality if needed
            
            # Optionally delete original
            os.remove(file_path)
            print(f"✅ Converted: {file} → {os.path.basename(webp_path)}")
        except Exception as e:
            print(f"⚠️ Failed to convert {file}: {e}")
