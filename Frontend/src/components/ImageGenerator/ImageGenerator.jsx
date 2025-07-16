import React, {useState} from 'react';
import imageService from '../../services/imageServices';
import getAuth from '../../Utility/auth';

function ImageGenerator() {

    const [prompt, setPrompt] = useState('')
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const user = getAuth();
    const token = user.user_token;
    const id = user.user_id;


    const handleGenerator = async () => {
        setLoading(true);

        console.log("prompt", prompt)

        try {
            const response = await imageService.imageGenerator(prompt, token, id);
            setImage(response.data.image);

        } catch(error) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>DreamStudio Image Generator</h1>
            <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder='Enter image prompt'/>
            <button onClick={handleGenerator} disabled={loading}>
                {loading ? 'Generating..' : 'Generate Image'}
            </button>

            {image && (
                <div>
                    <img src={image} alt="Generated"/>
                </div>
            )}
        </div>
    )
}

export default ImageGenerator