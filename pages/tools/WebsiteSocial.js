import React, { useState } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

const WebsiteSocial = () => {
  const [singleUrl, setSingleUrl] = useState('');
  const [multipleUrls, setMultipleUrls] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [socialProfiles, setSocialProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSingleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/socialMediaScrape', { urls: [singleUrl] });
      setSocialProfiles(response.data.results);
    } catch (error) {
      console.error("Error finding social profiles", error);
      setError('Failed to retrieve social profiles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMultipleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const urls = multipleUrls.split(',').map(url => url.trim());
      const response = await axios.post('/api/socialMediaScrape', { urls });
      setSocialProfiles(response.data.results);
    } catch (error) {
      console.error("Error finding social profiles", error);
      setError('Failed to retrieve social profiles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const fileContent = await uploadedFile.text();
      const urls = fileContent.split('\n').map(line => line.trim()).filter(Boolean);
      const response = await axios.post('/api/socialMediaScrape', { urls });
      setSocialProfiles(response.data.results);
    } catch (error) {
      console.error("Error finding social profiles", error);
      setError('Failed to retrieve social profiles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (profileUrl) => {
    navigator.clipboard.writeText(profileUrl);
    alert('Profile URL copied to clipboard!');
  };

  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8," + socialProfiles.map(e => `${e.url},${e.platform},${e.profile}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "social_profiles.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className="card p-4 w-100" style={{ backgroundColor: '#f6f0ff', borderRadius: '15px', maxWidth: '800px' }}>
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
                  type="text"
                  className="form-control text-center"
                  placeholder="https://example.com"
                  aria-label="URL Input"
                  value={singleUrl}
                  onChange={(e) => setSingleUrl(e.target.value)}
                />
              </div>
              <div className="d-grid">
                <button className="btn btn-primary" type="button" onClick={handleSingleSubmit}>
                  <i className="bi bi-search"></i> Find Social Profiles
                </button>
              </div>
            </div>
            <div className="tab-pane fade" id="multiple" role="tabpanel" aria-labelledby="multiple-tab">
              <div className="input-group mb-4">
                <textarea
                  className="form-control"
                  placeholder="Enter multiple URLs, separated by commas"
                  rows="3"
                  value={multipleUrls}
                  onChange={(e) => setMultipleUrls(e.target.value)}
                ></textarea>
              </div>
              <div className="d-grid">
                <button className="btn btn-primary" type="button" onClick={handleMultipleSubmit}>
                  <i className="bi bi-search"></i> Find Social Profiles
                </button>
              </div>
            </div>
            <div className="tab-pane fade" id="upload" role="tabpanel" aria-labelledby="upload-tab">
              <div className="mb-4">
                <input
                  className="form-control"
                  type="file"
                  onChange={(e) => setUploadedFile(e.target.files[0])}
                />
              </div>
              <div className="d-grid">
                <button className="btn btn-primary" type="button" onClick={handleUploadSubmit}>
                  <i className="bi bi-upload"></i> Upload and Find Social Profiles
                </button>
              </div>
            </div>
          </div>

          {loading && (
            <div className="d-flex justify-content-center mt-4">
              <ClipLoader color={"#123abc"} loading={loading} size={50} />
            </div>
          )}

          {error && (
            <div className="alert alert-danger mt-4" role="alert">
              {error}
            </div>
          )}

          {!loading && !error && socialProfiles.length > 0 && (
            <div className="mt-4">
              <table className="table table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Website URL</th>
                    <th>Platform</th>
                    <th>Profile</th>
                    <th>Copy</th>
                  </tr>
                </thead>
                <tbody>
                  {socialProfiles.map((data, index) => (
                    <tr key={`${index}-${data.platform}`}>
                      <td>{data.url}</td>
                      <td>{data.platform}</td>
                      <td><a href={data.profile} target="_blank" rel="noopener noreferrer">{data.profile}</a></td>
                      <td>
                        <button
                          className="btn btn-secondary btn-sm mb-2"
                          onClick={() => handleCopy(data.profile)}
                        >
                          Copy
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-center">
                <button className="btn btn-success" onClick={handleDownload}>
                  Download All Social Profiles
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteSocial;
