import React from 'react';
import WebsiteNumber from './WebsiteNumber';
import WebsiteSocial from './WebsiteSocial';

const NumberFinder = () => {
    return (
        <div className='container'>
            <h2 className='text-center pt-5 pb-5'>LeadStal Social  Finder</h2>
            <div className='text-center'>
    <ul class="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Website Contact Number Finder</button>
        </li>
       
    </ul>
    <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
            <WebsiteSocial/>
        </div>
       
        
    </div>
</div>

        </div>
    );
};

export default NumberFinder;