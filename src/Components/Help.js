import React, { useEffect, useRef, useState } from 'react';
import ContactUsSection from './ContactUsSection';
import FAQSection from './FAQSection';

export default function Help() {
    const [section, setSection] = useState('');
    const ref = useRef(null);
    const [scHeight, setScHeight] = useState();

    return (
        <div className="help">
            <div className="help__container">
                <div className="help__header-section">
                    <div className="help__header-section_background"></div>
                    <div>
                        <div
                            onClick={() => {
                                setSection('FAQ');
                                setTimeout(() => {
                                    let content = document.querySelector('.help__content');
                                    ref.current.style.paddingBottom = content.scrollHeight + 15 + 'px';
                                    setScHeight(content.scrollHeight);
                                    console.log(content.scrollHeight);
                                });
                            }}
                            className="help__header-item"
                        >
                            F.A.Q.
                        </div>
                        <div
                            onClick={() => {
                                setSection('ContactUs');
                                setTimeout(() => {
                                    let content = document.querySelector('.help__content');
                                    ref.current.style.paddingBottom = content.scrollHeight + 15 + 'px';
                                    console.log(content.scrollHeight);
                                });
                            }}
                            className="help__header-item"
                        >
                            Contact Us
                        </div>
                    </div>
                    <div className="help__header-section_background"></div>
                </div>
                <div ref={ref} className="help__body-section">
                    {section === '' && <div className="help__title">Choose a section on the left.</div>}
                    {section === 'FAQ' && <FAQSection />}
                    {section === 'ContactUs' && <ContactUsSection />}
                </div>
            </div>
        </div>
    );
}
