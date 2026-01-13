import React from 'react';

const PrivacyPolicy = () => {
    const containerStyle = {
        padding: '40px 20px',
        maxWidth: '1000px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        color: '#fff',
        backgroundColor: '#000',
        marginTop: '40px',
        marginBottom: '40px'
    };

    const headingStyle = {
        marginBottom: '20px',
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center'
    };

    const subHeadingStyle = {
        marginBottom: '10px',
        fontSize: '1.25rem',
        fontWeight: 'bold',
        borderBottom: '1px solid #333',
        paddingBottom: '10px'
    };

    const sectionStyle = {
        marginBottom: '30px'
    };

    const paragraphStyle = {
        marginBottom: '15px'
    };

    const listStyle = {
        listStyleType: 'decimal',
        marginLeft: '20px',
        marginBottom: '15px'
    };

    const listItemStyle = {
        marginBottom: '10px'
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>PRIVACY POLICY</h1>
            <div style={{ textAlign: 'center', marginBottom: '30px', fontSize: '0.9rem', color: '#ccc' }}>
                <p>Posted on: 12/01/2026</p>
                <p>Effective from: 06/09/2025</p>
            </div>

            <div style={{ marginBottom: '30px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'justify', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
                <p style={{ marginBottom: '15px' }}>THIS PRIVACY POLICY IS AN ELECTRONIC RECORD IN THE FORM OF AN ELECTRONIC CONTRACT FORMED UNDER THE INFORMATION TECHNOLOGY ACT, 2000 AND THE RULES MADE THEREUNDER AND THE AMENDED PROVISIONS PERTAINING TO ELECTRONIC DOCUMENTS / RECORDS IN VARIOUS STATUTES AS AMENDED BY THE INFORMATION TECHNOLOGY ACT, 2000 AND OTHER APPLICABLE LAWS. THIS PRIVACY POLICY DOES NOT REQUIRE ANY PHYSICAL, ELECTRONIC OR DIGITAL SIGNATURE.</p>
                <p>THIS PRIVACY POLICY IS PUBLISHED AND SHALL BE CONSTRUED IN ACCORDANCE WITH THE PROVISIONS OF THE INFORMATION TECHNOLOGY (REASONABLE SECURITY PRACTICES AND PROCEDURES AND SENSITIVE PERSONAL DATA OF INFORMATION) RULES, 2011 FRAMED UNDER INFORMATION TECHNOLOGY ACT, 2000 AND OTHER RULES AND REGULATIONS MADE THEREUNDER/THEREAFTER; THAT REQUIRES PUBLISHING OF THE PRIVACY POLICY FOR COLLECTION, USE, STORAGE AND TRANSFER OF SENSITIVE PERSONAL DATA OR INFORMATION.</p>
            </div>

            <section style={{ ...sectionStyle, textAlign: 'justify' }}>
                <p style={paragraphStyle}>Thank you for using the products and services offered by Genrobotic Innovations Pvt Ltd (CIN: U74999KL2017PTC049500) (“we”, “us” or “our”)! We value the trust you place in us.</p>
                <p style={paragraphStyle}>We are committed to protecting your privacy. This Privacy Policy explains how we collect, use and share your personal information and other information provided by you. This Privacy Policy applies to your use of the products and services offered by us (which includes our websites, apps, digital contents etc.) (“our products and/or services”) as further described in our Terms and Conditions available at <a href="https://genrobotics.com/" style={{ color: '#0066ff', textDecoration: 'underline' }}>https://genrobotics.com/</a>, as applicable (“Terms and Conditions”).</p>
                <p style={paragraphStyle}>By using our products or availing our services, you agree to be bound by and are deemed to have read, understood and agreed to the terms and conditions of this Privacy Policy. You hereby expressly consent to the processing of your personal information and non-personal information in accordance with this Privacy Policy.</p>
                <p style={paragraphStyle}>Please note that our products and services are offered in and are being operated from the Republic of India. In the event you are located in any place other than in the Republic of India, you shall not be eligible to avail our services/products.</p>
            </section>

            <section style={sectionStyle}>
                <h2 style={subHeadingStyle}>I. TYPES OF INFORMATION WE COLLECT</h2>
                <p style={paragraphStyle}>We collect personal, sensitive and other information from you in a variety of ways when you use our products and/or services, such as:</p>
                <ol style={listStyle}>
                    <li style={listItemStyle}><strong>Account and Personal Data:</strong> We collect information like your name, company’s name, email, phone number, and identity proofs. We may receive information from third-party social networking sites (Twitter, LinkedIn, Google+, Facebook) if you use them to log in.</li>
                    <li style={listItemStyle}><strong>Products’ and/or Services’ Use Related:</strong> We store, process and transmit your files (images, videos, feedback, metadata) and information related to them.</li>
                    <li style={listItemStyle}><strong>Surveys:</strong> Optional surveys for demographic information to tailor your experience.</li>
                    <li style={listItemStyle}><strong>Usage:</strong> Device settings, location, IP address, ISP, and system status reports.</li>
                    <li style={listItemStyle}><strong>Cookies and other technologies:</strong> We use cookies and pixel tags to provide, improve, and protect our services.</li>
                    <li style={listItemStyle}><strong>Beacons/Bugs:</strong> Used to analyze navigation through our services.</li>
                    <li style={listItemStyle}><strong>Analytic Services:</strong> Third-party services like Google Analytics and Smartlook to analyze usage patterns.</li>
                    <li style={listItemStyle}><strong>Other Information:</strong> Sensitive personal data as defined under Rule 3 of the IT Rules, 2011.</li>
                </ol>
            </section>

            <section style={sectionStyle}>
                <h2 style={subHeadingStyle}>II. HOW WE USE YOUR INFORMATION</h2>
                <ol style={listStyle}>
                    <li style={listItemStyle}><strong>For Main Purpose:</strong> To provide products and services requested by you.</li>
                    <li style={listItemStyle}><strong>For Emailing:</strong> Responding to inquiries (we are not responsible for errors in provided contact details).</li>
                    <li style={listItemStyle}><strong>For Other Offerings:</strong> Informing you about new products or enhancements.</li>
                    <li style={listItemStyle}><strong>For Research:</strong> Market research and analysis on an anonymous basis.</li>
                    <li style={listItemStyle}><strong>For Operations:</strong>
                        <ul style={{ listStyleType: 'lower-alpha', marginLeft: '20px', marginTop: '10px' }}>
                            <li>To verify ownership of email;</li>
                            <li>To identify you in our system;</li>
                            <li>To facilitate secure user experience;</li>
                            <li>To notify you about updates;</li>
                            <li>To customize quality of experience;</li>
                            <li>To send administrative notifications, newsletters, and promotional materials.</li>
                        </ul>
                    </li>
                    <li style={listItemStyle}><strong>General:</strong> Using aggregated or de-identified information for any purpose.</li>
                </ol>
            </section>

            <section style={sectionStyle}>
                <h2 style={subHeadingStyle}>III. HOW WE SHARE YOUR INFORMATION</h2>
                <ol style={listStyle}>
                    <li style={listItemStyle}><strong>Internally:</strong> With consultants, representatives, and contractors.</li>
                    <li style={listItemStyle}><strong>Others working for us:</strong> Trusted third parties providing analytics or specialized services.</li>
                    <li style={listItemStyle}><strong>Third Parties:</strong> Cookie data with advertising partners for targeted ads.</li>
                    <li style={listItemStyle}><strong>Government:</strong> For identity verification or investigation of cyber incidents/offences.</li>
                    <li style={listItemStyle}><strong>Structural Changes:</strong> In connection with mergers, acquisitions, or bankruptcy.</li>
                    <li style={listItemStyle}><strong>Law & Order:</strong> To comply with laws or protect safety.</li>
                </ol>
            </section>

            <section style={sectionStyle}>
                <h2 style={subHeadingStyle}>IV. STORING OF INFORMATION</h2>
                <ol style={listStyle}>
                    <li style={listItemStyle}><strong>Security:</strong> We implement administrative and technical measures but cannot guarantee 100% security over the internet.</li>
                    <li style={listItemStyle}><strong>Retention:</strong> We retain data as long as needed for services or legal requirements.</li>
                    <li style={listItemStyle}><strong>Around the world:</strong> Information may be stored or processed globally.</li>
                </ol>
            </section>

            <section style={sectionStyle}>
                <h2 style={subHeadingStyle}>V. GENERAL TERMS</h2>
                <ul style={{ ...listStyle, listStyleType: 'disc' }}>
                    <li style={listItemStyle}>Information shared in public Forums is not subject to this Privacy Policy.</li>
                    <li style={listItemStyle}>We are not responsible for the privacy practices of third-party websites linked in our services.</li>
                    <li style={listItemStyle}>If you believe your information is compromised, contact <strong>info@genrobotics.org</strong> immediately.</li>
                </ul>
            </section>

            <section style={sectionStyle}>
                <h2 style={subHeadingStyle}>VI. CHANGES TO THE PRIVACY POLICY</h2>
                <p style={paragraphStyle}>We may modify this policy at any time. The last modified version applies. It is your responsibility to review it periodically.</p>
            </section>

            <section style={sectionStyle}>
                <h2 style={subHeadingStyle}>VII. BINDING NATURE</h2>
                <p style={{ ...paragraphStyle, fontStyle: 'italic', fontSize: '0.9rem' }}>This is a legally binding electronic contract between you and Genrobotic Innovations Pvt Ltd under the IT Act, 2000.</p>
            </section>

            <section style={{ ...sectionStyle, padding: '20px', backgroundColor: '#111', borderRadius: '8px', border: '1px solid #333' }}>
                <h2 style={{ ...subHeadingStyle, borderBottom: 'none' }}>IX. CONTACT & GRIEVANCE</h2>
                <p style={paragraphStyle}><strong>Grievance Officer:</strong> Vipin MK</p>
                <p style={paragraphStyle}><strong>Email:</strong> <a href="mailto:Info@genrobotics.org" style={{ color: '#0066ff', textDecoration: 'underline' }}>Info@genrobotics.org</a></p>
                <p style={paragraphStyle}><strong>Subject Line:</strong> Attn: Privacy Policy</p>
                <p style={{ marginTop: '10px' }}>Website: <a href="https://genrobotics.com/" style={{ color: '#0066ff', textDecoration: 'underline' }}>https://genrobotics.com/</a></p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
