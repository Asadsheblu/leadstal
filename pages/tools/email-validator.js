import React, { useState } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

const WebsiteEmail = () => {
  const [singleEmail, setSingleEmail] = useState('');
  const [multipleEmails, setMultipleEmails] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [emailData, setEmailData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSingleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/emailValid', { emails: [singleEmail] });
      setEmailData(response.data.validationResults);
    } catch (error) {
      console.error('Error validating email:', error);
    }
    setLoading(false);
  };

  const handleMultipleSubmit = async () => {
    setLoading(true);
    try {
      const emailsArray = multipleEmails.split(',').map(email => email.trim());
      const response = await axios.post('/api/emailValid', { emails: emailsArray });
      setEmailData(response.data.validationResults);
    } catch (error) {
      console.error('Error validating emails:', error);
    }
    setLoading(false);
  };

  const handleUploadSubmit = async () => {
    if (!uploadedFile) return;
    setLoading(true);
    try {
      const fileContent = await uploadedFile.text();
      const emailsArray = fileContent.split('\n').map(line => line.trim()).filter(Boolean);
      const response = await axios.post('/api/emailValid', { emails: emailsArray });
      setEmailData(response.data.validationResults);
    } catch (error) {
      console.error('Error validating emails:', error);
    }
    setLoading(false);
  };

  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      emailData.map(e => `${e.email},${e.deliverability},${e.domain},${e.is_smtp_valid?.value ? 'True' : 'False'},${e.is_mx_found?.value ? 'Found' : 'Not Found'},${e.is_catchall_email?.value ? 'Yes' : 'No'}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "email_validation_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container pt-5 pb-5">
      <div className="d-flex justify-content-center">
        <div className="card p-4 w-100" style={{ backgroundColor: '#f6f0ff', borderRadius: '15px', maxWidth: '600px' }}>
          <ul className="nav nav-pills justify-content-center mb-4" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="single-tab" data-bs-toggle="pill" data-bs-target="#single" type="button" role="tab" aria-controls="single" aria-selected="true">Single</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="multiple-tab" data-bs-toggle="pill" data-bs-target="#multiple" type="button" role="tab" aria-controls="multiple" aria-selected="false">Multiple</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="upload-tab" data-bs-toggle="pill" data-bs-target="#upload" type="button" role="tab" aria-controls="upload" aria-selected="false">Upload</button>
            </li>
          </ul>

          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="single" role="tabpanel" aria-labelledby="single-tab">
              <div className="input-group mb-4">
                <input
                  type="email"
                  className="form-control text-center"
                  placeholder="Enter email address"
                  aria-label="Email Input"
                  value={singleEmail}
                  onChange={(e) => setSingleEmail(e.target.value)}
                />
              </div>
              <div className="d-grid">
                <button className="btn btn-primary" type="button" onClick={handleSingleSubmit}>
                  <i className="bi bi-check-circle"></i> Run Validation
                </button>
              </div>
            </div>
            <div className="tab-pane fade" id="multiple" role="tabpanel" aria-labelledby="multiple-tab">
              <div className="input-group mb-4">
                <textarea
                  className="form-control"
                  placeholder="Enter multiple email addresses, separated by commas"
                  rows="3"
                  value={multipleEmails}
                  onChange={(e) => setMultipleEmails(e.target.value)}
                ></textarea>
              </div>
              <div className="d-grid">
                <button className="btn btn-primary" type="button" onClick={handleMultipleSubmit}>
                  <i className="bi bi-check-circle"></i> Run Validation
                </button>
              </div>
            </div>
            <div className="tab-pane fade" id="upload" role="tabpanel" aria-labelledby="upload-tab">
              <div className="mb-4">
                <input
                  className="form-control"
                  type="file"
                  accept=".txt"
                  onChange={(e) => setUploadedFile(e.target.files[0])}
                />
              </div>
              <div className="d-grid">
                <button className="btn btn-primary" type="button" onClick={handleUploadSubmit}>
                  <i className="bi bi-upload"></i> Upload and Validate Emails
                </button>
              </div>
            </div>
          </div>

          {loading && (
            <div className="d-flex justify-content-center mt-4">
              <ClipLoader color={"#123abc"} loading={loading} size={50} />
            </div>
          )}

          {!loading && emailData.length > 0 && (
            <div className="mt-4">
              <table className="table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {emailData.map((emailData, index) => (
                    <tr key={index}>
                      <td>
                        <span className={emailData.deliverability === 'DELIVERABLE' ? 'text-success' : 'text-danger'}>
                          <i className={`bi ${emailData.deliverability === 'DELIVERABLE' ? 'bi-check-circle' : 'bi-x-circle'}`}></i>
                          {` ${emailData.email}`}
                        </span>
                      </td>
                      <td>
                        <div>Status: {emailData.deliverability === 'DELIVERABLE' ? 'Valid' : 'Invalid'}</div>
                        <div>Reason: {emailData.deliverability}</div>
                        <div>Domain: {emailData.domain}</div>
                        <div>SMTP Check: {emailData.is_smtp_valid?.value ? 'True' : 'False'}</div>
                        <div>MX Records: {emailData.is_mx_found?.value ? 'Found' : 'Not Found'}</div>
                        <div>Catch-All: {emailData.is_catchall_email?.value ? 'Yes' : 'No'}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="d-grid">
                <button className="btn btn-success mt-3" type="button" onClick={handleDownload}>
                  <i className="bi bi-download"></i> Download Results
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteEmail;
