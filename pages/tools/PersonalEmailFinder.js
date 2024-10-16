import React, { useState } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

const PersonalEmailFinder = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyDomain, setCompanyDomain] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!firstName || !lastName || !companyDomain) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/pemailscrape', {
        firstName,
        lastName,
        companyDomain,
      });

      const fullName = `${firstName} ${lastName}`;
      const email = response.data.email || 'Email Not Found';

      setResults([...results, { fullName, email }]);
    } catch (error) {
      console.error('Error finding email:', error);
      const fullName = `${firstName} ${lastName}`;
      setResults([...results, { fullName, email: 'Email Not Found' }]);
    }
    setLoading(false);
  };

  const handleCopy = (email) => {
    navigator.clipboard.writeText(email);
    alert('Email copied to clipboard!');
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className="card p-4 w-100" style={{ backgroundColor: '#f6f0ff', borderRadius: '15px', maxWidth: '600px' }}>
          <div className="mb-4">
            <input
              type="text"
              className="form-control text-center"
              placeholder="First Name"
              aria-label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="form-control text-center"
              placeholder="Last Name"
              aria-label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="form-control text-center"
              placeholder="company.com"
              aria-label="Company Domain"
              value={companyDomain}
              onChange={(e) => setCompanyDomain(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-primary" type="button" onClick={handleSubmit}>
              {loading ? <ClipLoader color={"#fff"} loading={loading} size={20} /> : <><i className="bi bi-search"></i> Find Emails</>}
            </button>
          </div>

          {results.length > 0 && (
            <div className="mt-4">
              <table className="table table-bordered">
                <thead style={{ backgroundColor: '#f6f0ff' }}>
                  <tr>
                    <th>Full Name</th>
                    <th>Emails</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index}>
                      <td>{result.fullName}</td>
                      <td>{result.email}</td>
                      <td>
                        {result.email !== 'Email Not Found' && (
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleCopy(result.email)}
                          >
                            Copy
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalEmailFinder;
