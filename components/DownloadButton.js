export default function DownloadButton({ downloadUrl }) {
    if (!downloadUrl) return null;
  
    return (
      <a
        href={downloadUrl}
        download
        className="block w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium text-center transition"
      >
        Download Synthesized File
      </a>
    );
  }
  