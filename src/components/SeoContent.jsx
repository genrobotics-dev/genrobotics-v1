"use client";
import React from 'react';
import { motion } from 'framer-motion';

const SeoPage = () => {
    return (
        <section className="seo_page bg-black text-white pb-20">
            <div className='container-fluid'>
                {/* Custom styles for this page to match the reference exactly */}
                <style jsx>{`
                .seo-heading {
                    font-family: var(--font-roboto), sans-serif;
                    font-size: clamp(2rem, 5vw, 45px); /* Responsive font size */
                    font-weight: 600;
                    line-height: 1.2;
                    color: white;
                    position: relative;
                    z-index: 10;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .seo-hero-section {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    padding-top: 4rem;
                    padding-bottom: 4rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                @media (min-width: 768px) {
                    .seo-hero-section {
                        padding-top: 6rem;
                        padding-bottom: 6rem;
                    }
                }
                .seo-gradient-bg {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    height: 100%;
                    min-height: 500px;
                    background: radial-gradient(circle, rgba(252, 217, 1, 0.5) 0%, rgba(255, 255, 255, 0) 70%);
                    z-index: 0;
                    pointer-events: none;
                }
                
                .seo-content h2, .seo-content h3, .seo-content h4 {
                    font-family: var(--font-roboto), sans-serif;
                    font-weight: 600;
                    color: white;
                    margin-top: 2.5rem;
                    margin-bottom: 1rem;
                }
            
                .seo-content h3 { font-size: clamp(1.5rem, 3vw, 1.75rem); line-height: 1.3; }
                .seo-content h4 { font-size: clamp(1.25rem, 2.5vw, 1.5rem); line-height: 1.3; }
                .seo-content ul, .seo-content ol {
                    margin-bottom: 1.5rem;
                    padding-left: 1.5rem;
                }
                .seo-content li {
                    margin-bottom: 0.5rem;
                    font-size: clamp(1rem, 2vw, 1.125rem);
                    color: white;
                }
                .seo-content li::marker {
                    color: #FCD901; /* Marketing yellow */
                }
                .seo-content strong {
                    color: white;
                    font-weight: 600;
                }
            `}</style>

                {/* Full Width Hero Section with Gradient and H1 */}
                <div className="seo-hero-section text-center">
                    <div className="seo-gradient-bg"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <h1 className="seo-heading">
                            {"Rehabilitation Robotics - Redefining Mobility, Recovery & Human Dignity".split(" ").map((word, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    style={{ display: "inline-block", marginRight: "0.25em" }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </h1>
                    </div>
                </div>

                {/* Content Section - Expanded width to match heading (max-w-[1200px]) */}
                <div className="container mx-auto px-4 max-w-[1200px] pt-8 md:pt-12">
                    <div className="seo-content">
                        <p className="text-base md:text-lg leading-relaxed text-white mb-6">
                            Genrobotics’ <a href="https://www.genroboticsmedical.com/g-gaiter" target="_blank" className="text-blue-600 underline active:text-blue-300 transition-colors hover:underline">G Gaiter</a> is the advanced robotic gait trainer built to support mobility
                            rehabilitation with precision, safety and structured therapy. It is designed for individuals
                            recovering from stroke, spinal cord injury, traumatic brain injury, neuro muscular conditions
                            and post surgical mobility challenges. The system delivers consistent gait training that goes
                            far beyond what manual therapy can achieve.
                        </p>
                        <p className="text-base md:text-lg leading-relaxed text-white mb-6">
                            By combining refined biomechanics with AI driven feedback, the G Gaiter strengthens the
                            foundation of modern neuro rehabilitation and robotic physiotherapy.
                        </p>

                        <h3>A New Era of Mobility Rehabilitation</h3>
                        <p className="text-base md:text-lg leading-relaxed text-white mb-6">Mobility loss can follow conditions such as</p>
                        <ul className="list-disc">
                            <li>Stroke</li>
                            <li>Spinal cord injury</li>
                            <li>Traumatic brain injury</li>
                            <li>Neuro muscular disorders</li>
                            <li>Orthopedic surgeries</li>
                        </ul>
                        <p className="text-base md:text-lg leading-relaxed text-white mb-6">
                            Traditional therapy often cannot sustain the repetition and precision needed for effective
                            neurological relearning. Robotic rehabilitation changes that, offering structured, repeatable
                            and controlled movement that supports better PMR outcomes.
                        </p>

                        <h3>G Gaiter, Genrobotics’ Robotic Gait Trainer</h3>
                        <p className="text-base md:text-lg leading-relaxed text-white mb-6">
                            The G Gaiter simulates natural walking patterns while supporting balance and bodyweight. It
                            gives therapists clear data, consistent movement cycles and precise control over training
                            intensity.
                        </p>

                        <h4>Key Capabilities</h4>
                        <ul className="list-disc">
                            <li><strong>AI based gait correction:</strong> Tracks movement and helps reduce deviations through continuous feedback.</li>
                            <li><strong>Natural gait simulation:</strong> Biomechanical design supports smoother motor relearning.</li>
                            <li><strong>Adjustable support:</strong> Therapists can set speed, step length, intensity and bodyweight support as needed.</li>
                            <li><strong>High repetition training:</strong> Delivers controlled, repeatable steps that help reinforce neural pathways.</li>
                            <li><strong>Built in safety systems:</strong> Stability support improves safety for users with limited balance.</li>
                            <li><strong>Clinical data insights:</strong> Tracks gait parameters, symmetry and progress across sessions.</li>
                        </ul>

                        <h3>Why Robotic Rehabilitation Strengthens PMR Practice</h3>
                        <ul className="list-disc">
                            <li><strong>Improved functional gains:</strong> Supports better gait symmetry, balance, coordination and mobility.</li>
                            <li><strong>Reliable high intensity sessions:</strong> Therapy remains consistent, structured and fatigue free.</li>
                            <li><strong>Better therapist efficiency:</strong> Clinicians can manage sessions with greater clarity and control.</li>
                            <li><strong>Standardized protocols:</strong> Reduces variability between sessions.</li>
                            <li><strong>Better motivation for users:</strong> Visible progress and steady support build confidence.</li>
                        </ul>

                        <h3>Clinical Applications</h3>
                        <ul className="list-disc">
                            <li>Stroke rehabilitation</li>
                            <li>Spinal cord injury rehabilitation</li>
                            <li>Traumatic brain injury rehabilitation</li>
                            <li>Orthopedic post surgery recovery</li>
                        </ul>

                        <h3>Built for Rehabilitation Centres and Clinical Facilities</h3>
                        <p className="text-base md:text-lg leading-relaxed text-white mb-6">The G Gaiter integrates well into</p>
                        <ul className="list-disc">
                            <li>Neuro rehabilitation units</li>
                            <li>Multispeciality hospitals</li>
                            <li>Orthopedic centers</li>
                            <li>Stroke care units</li>
                            <li>Long term care facilities</li>
                            <li>Physiotherapy institutes</li>
                        </ul>
                        <p className="text-base md:text-lg leading-relaxed text-white mb-6">Its compact footprint and smooth operation make it suitable even for smaller centres.</p>

                        <h3>Genrobotics</h3>
                        <p className="text-base md:text-lg leading-relaxed text-white mb-6">
                            Genrobotics builds solutions that merge engineering with purpose, focusing on technologies
                            that elevate human dignity. The G Gaiter reflects this mission by enabling structured,
                            confident mobility rehabilitation.
                        </p>

                        <h4>What Sets Us Apart</h4>
                        <ul className="list-disc">
                            <li>In house research and development</li>
                            <li>Clinically validated engineering</li>
                            <li>Strong service and support</li>
                            <li>Designed to meet diverse rehabilitation needs</li>
                        </ul>

                        <h3>Frequently Asked Questions</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-lg mb-2">1. What is a rehabilitation robot?</h4>
                                <p className="text-base md:text-lg leading-relaxed text-white">It is a system that supports mobility restoration through controlled, repetitive gait cycles essential for neurological recovery.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-2">2. Who can benefit from the G Gaiter?</h4>
                                <p className="text-base md:text-lg leading-relaxed text-white">Individuals with stroke, spinal injuries, traumatic brain injury, Parkinson’s and post operative mobility challenges.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-2">3. How does robotic gait training help recovery?</h4>
                                <p className="text-base md:text-lg leading-relaxed text-white">By delivering accurate, repeatable movement that supports motor relearning.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-2">4. Is it safe for older adults?</h4>
                                <p className="text-base md:text-lg leading-relaxed text-white">Yes. Stability support, bodyweight assistance and adjustable parameters help ensure safety.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-2">5. Does it replace physiotherapists?</h4>
                                <p className="text-base md:text-lg leading-relaxed text-white">No. It supports their clinical judgement by providing precise mechanical assistance.</p>
                            </div>
                        </div>

                        <div className="mt-16 p-8 bg-black rounded-2xl border border-gray-500 shadow-yellow-500/50 shadow-lg text-center">
                            <h3 className="!mt-0 !mb-4 text-white">Strengthen Your Rehabilitation Practice</h3>
                            <p className="text-base md:text-lg leading-relaxed text-white">
                                If you are upgrading your PMR department or planning an advanced neuro rehabilitation
                                setup, the G Gaiter is a reliable and clinically aligned gait trainer designed to support stronger
                                rehabilitation progress.
                            </p>
                            <div className="mt-8 pt-6 border-t border-gray-700">
                                <p className="font-bold text-xl text-white mb-2 flex items-center justify-center">
                                    <a href="https://www.genroboticsmedical.com/#contact-form-12" className="text-white hover:underline flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        Book a Demo
                                    </a>
                                    <span className="mx-4">|</span>
                                    <a href="https://www.genroboticsmedical.com/#contact-form-12" className="text-white hover:underline flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-5 8h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2h2m4 0h4m-4 0a2 2 0 01-2-2v-4a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2z" />
                                        </svg>
                                        Request a Quote
                                    </a>
                                </p>
                                <p className="text-white">Empower recovery. Support mobility. Uphold human dignity with Genrobotics’ rehabilitation solutions.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default SeoPage;
