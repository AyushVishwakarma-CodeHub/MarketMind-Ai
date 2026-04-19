import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { HiOutlineArrowUpTray } from 'react-icons/hi2';
import { uploadCSV } from '../services/api';

export default function FileUpload({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setUploading(true);
    setStatus('Processing...');

    try {
      const result = await uploadCSV(file);
      setStatus(result.message);
      if (onUploadSuccess) {
        onUploadSuccess(result);
      }
    } catch (error) {
      setStatus(error.response?.data?.error || 'Upload failed.');
    } finally {
      setTimeout(() => setStatus(''), 5000);
      setUploading(false);
    }
  }, [onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    maxFiles: 1,
    disabled: uploading,
  });

  return (
    <div 
      {...getRootProps()} 
      className={`upload-container ${isDragActive ? 'active' : ''}`}
    >
      <input {...getInputProps()} />
      <div className="upload-icon-wrapper">
        <HiOutlineArrowUpTray size={20} />
      </div>
      <div className="upload-text">
        {uploading ? 'Processing File...' : 'Click or drop a CSV to upload'}
      </div>
      <div className="upload-subtext">
        {status ? <span style={{color: 'var(--accent-success)'}}>{status}</span> : 'Supports name, email, last_purchase_date, total_spent'}
      </div>
    </div>
  );
}
