import { useState } from 'react';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import { sendMessage, isTyping } from 'react-chat-engine';

const MessageForm = (props) => {
  const [value, setValue] = useState('');
  const { chatId, creds } = props;

  const handleChange = (event) => {
    setValue(event.target.value);

    // Trigger 'isTyping' event when the user is typing
    isTyping(props, chatId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const text = value.trim();

    if (text.length > 0) {
      // Send the message when the user submits the form
      sendMessage(creds, chatId, { text });
    }

    // Clear the input field after sending the message
    setValue('');
  };

  const handleUpload = (event) => {
    // Send uploaded files as messages
    sendMessage(creds, chatId, { files: event.target.files, text: '' });
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      {/* Input field for typing messages */}
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
      />
      {/* Button to upload images */}
      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon" />
        </span>
      </label>
      {/* Input field for uploading images */}
      <input
        type="file"
        accept="image/*"
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleUpload}
      />
      {/* Button to submit the form */}
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" />
      </button>
    </form>
  );
};

export default MessageForm;
