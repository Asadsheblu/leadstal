import React from 'react';
import WebsiteEmail from './WebsiteEmail';
import PersonalEmailFinder from './PersonalEmailFinder';

const EmailFinder = () => {
    return (
        <div className='container'>
            <h2 className='text-center pt-5 pb-5'>LeadStal Email Finder</h2>
            <div className='text-center'>
    <ul class="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Website Email Finder</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Personal Email Finder</button>
        </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
            <WebsiteEmail/>
        </div>
        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
            <PersonalEmailFinder/>
        </div>
        
    </div>
</div>

        </div>
    );
};

export default EmailFinder;