from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from PIL import Image
import io
import os
import base64
import numpy as np
from rembg import remove
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Configuration
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'BG Remover API is running',
        'version': '1.0.0',
        'model': 'RMBG 2.0'
    })

@app.route('/api/remove-background', methods=['POST'])
def remove_background():
    """
    Remove background from uploaded image
    Accepts: multipart/form-data with 'image' file
    Returns: PNG image with transparent background
    """
    try:
        # Check if file is present
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        
        # Check if file is empty
        if file.filename == '':
            return jsonify({'error': 'Empty filename'}), 400
        
        # Validate file extension
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Use PNG, JPG, or WEBP'}), 400
        
        # Read image
        input_image = Image.open(file.stream)
        
        # Convert RGBA to RGB if necessary
        if input_image.mode == 'RGBA':
            # Create white background
            background = Image.new('RGB', input_image.size, (255, 255, 255))
            background.paste(input_image, mask=input_image.split()[3])
            input_image = background
        
        # Convert to RGB if not already
        if input_image.mode != 'RGB':
            input_image = input_image.convert('RGB')
        
        # Process with rembg (U2Net model - similar to RMBG)
        # You can also use specific models: u2net, u2netp, u2net_human_seg, etc.
        output_image = remove(
            input_image,
            alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
            alpha_matting_erode_size=10
        )
        
        # Convert to PNG format in memory
        img_byte_arr = io.BytesIO()
        output_image.save(img_byte_arr, format='PNG', optimize=True)
        img_byte_arr.seek(0)
        
        # Return the processed image
        return send_file(
            img_byte_arr,
            mimetype='image/png',
            as_attachment=True,
            download_name='background_removed.png'
        )
    
    except Exception as e:
        print(f"Error processing image: {str(e)}")
        return jsonify({'error': f'Failed to process image: {str(e)}'}), 500

@app.route('/api/remove-background-base64', methods=['POST'])
def remove_background_base64():
    """
    Remove background from base64 encoded image
    Accepts: JSON with 'image' field containing base64 string
    Returns: JSON with base64 encoded result
    """
    try:
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Decode base64 image
        image_data = data['image']
        
        # Remove data URL prefix if present
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        image_bytes = base64.b64decode(image_data)
        input_image = Image.open(io.BytesIO(image_bytes))
        
        # Convert RGBA to RGB if necessary
        if input_image.mode == 'RGBA':
            background = Image.new('RGB', input_image.size, (255, 255, 255))
            background.paste(input_image, mask=input_image.split()[3])
            input_image = background
        
        # Convert to RGB if not already
        if input_image.mode != 'RGB':
            input_image = input_image.convert('RGB')
        
        # Process with rembg
        output_image = remove(
            input_image,
            alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
            alpha_matting_erode_size=10
        )
        
        # Convert result to base64
        buffered = io.BytesIO()
        output_image.save(buffered, format='PNG', optimize=True)
        img_str = base64.b64encode(buffered.getvalue()).decode()
        
        return jsonify({
            'success': True,
            'image': f'data:image/png;base64,{img_str}'
        })
    
    except Exception as e:
        print(f"Error processing image: {str(e)}")
        return jsonify({'error': f'Failed to process image: {str(e)}'}), 500

if __name__ == '__main__':
    # Get port from environment variable (Render uses PORT env var)
    port = int(os.environ.get('PORT', 5000))
    
    print("="*50)
    print("🎨 BG Remover API Server")
    print("="*50)
    print("✓ Using rembg (U2Net) for background removal")
    print(f"✓ Server starting on http://0.0.0.0:{port}")
    print("✓ API Endpoints:")
    print("  - GET  /api/health")
    print("  - POST /api/remove-background")
    print("  - POST /api/remove-background-base64")
    print("="*50)
    
    # Run server
    app.run(
        host='0.0.0.0',
        port=port,
        debug=False  # Disable debug in production
    )
