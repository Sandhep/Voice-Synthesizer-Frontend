import { useState } from 'react';
import FileUploader from '../components/FileUploader';
import TextInput from '../components/TextInput';
import DownloadButton from '../components/DownloadButton';
import { supabase } from '../supabaseClient';
import axios from 'axios';
import '../styles/globals.css'

export default function Home() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleSynthesize = async () => {
    if (!file || !text) {
      alert('Please upload a file and enter text.');
      return;
    }

    try {
      // Upload the file to Supabase
      const { data, error } = await supabase.storage
        .from('voice-files')
        .upload(`uploads/${file.name}`, file);

      if (error) throw error;

      const fileUrl = supabase.storage.from('voice-files').getPublicUrl(data.path).data.publicUrl;

      // Send the file URL and text to the backend API for synthesis
      const response = await axios.post('/api/synthesize', { fileUrl, text });
      setDownloadUrl(response.data.synthesizedFileUrl);
    } catch (error) {
      console.error('Error during synthesis:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg max-w-lg w-full p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Voice Synthesizer</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Upload a voice file, type your desired text, and create magic!
        </p>
        <div className="space-y-4">
          <FileUploader onFileSelect={setFile} />
          <TextInput text={text} setText={setText} />
          <button
            onClick={handleSynthesize}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition"
          >
            Synthesize Voice
          </button>
          {downloadUrl && <DownloadButton downloadUrl={downloadUrl} />}
        </div>
      </div>
    </div>
  );
}
