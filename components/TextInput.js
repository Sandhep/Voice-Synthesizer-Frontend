export default function TextInput({ text, setText }) {
    return (
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">Enter Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength="500"
          className="border border-gray-300 rounded-lg p-2 h-20 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="Type the desired text here..."
        />
      </div>
    );
  }
  