export default function FileUploader({ onFileSelect }) {
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        onFileSelect(selectedFile);
      }
    };
  
    return (
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">Upload Voice File</label>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    );
  }
  