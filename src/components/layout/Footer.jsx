"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer>
      <div className="section mb-12">
        <div className="hidden lg:block bg-[#1b1b1b] w-full rounded-xl border-[0.5px] border-[#FCD901]/40 ">
          <div className="divide-y divide-[#FCD901]/40 p-8">
            <div className="flex justify-between divide-x divide-[#FCD901]/40 pb-8">
              <div className="flex flex-col space-y-2 flex-4 pr-4 lg:items-center lg:justify-center">
                <div className="relative w-[250px] lg:w-[20rem] aspect-[344/79] overflow-hidden">
                  <Image
                    src="/layout/gen-logo-footer.svg"
                    alt="Genrobotics Logo"
                    fill
                  />
                </div>
              </div>
              <div className="flex-4 flex justify-around gap-8 flex-wrap">
                <ul className="list-none p-0">
                  <li className="mt-6">
                    <Link href="/about" className="text-white decoration-0">
                      About us
                    </Link>
                  </li>
                  <li className="my-6">
                    <Link href="/case-study" className="text-white decoration-0">
                      Case Study
                    </Link>
                  </li>
                  <li className="mt-6">
                    <Link
                      href="/news"
                      className="text-white decoration-0"
                    >
                      News
                    </Link>
                  </li>
                </ul>
                <ul>
                  <li className="mt-6">
                    <Link
                      href="/#verticals"
                      className="text-white decoration-0"
                    >
                      Verticals
                    </Link>
                  </li>
                  <li className="mt-6">
                    <Link
                      href="/vendor-registration"
                      className="text-white decoration-0"
                    >
                      Be a vendor
                    </Link>
                  </li>
                  <li className="my-6">
                    <Link href="/CSR" className="text-white decoration-0">
                      CSR
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex-4 flex flex-col justify-center items-center space-y-8">
                {/*<Link
                  href="https://drive.google.com/file/d/1nY-sa_t8Kjk3hUu9V69bGmraxYZZwuwU/view?usp=drive_link"
                  target="_blank"
                  className="px-6 py-2 rounded-lg text-xs bg-[#C5A341] w-fit mt-6 mx-auto"
                  aria-label="Download E Brochure"
                  aria-describedby="new-window-brochure"
                >
                  Download E Brochure
                </Link>
                <span id="new-window-brochure" className="sr-only">Opens in new window</span>*/}
                <div>
                  <p className="font-thin text-sm text-white text-center mb-2">
                    Follow us on
                  </p>
                  <div className="flex gap-4">
                    <Link
                      href="https://x.com/GenRobotic"
                      target="_blank"
                      aria-label="Follow us on X"
                      aria-describedby="new-window-x"
                      className="relative inline-flex w-10 h-10 p-3 bg-[#2b2b2b] text-[#C5A341] rounded-full justify-center items-center"
                    >
                      <Image
                        src="/layout/socialmedia/x.svg"
                        alt="x-logo"
                        height={25}
                        width={25}
                      />
                    </Link>
                    <Link
                      href="https://www.facebook.com/genrobotic"
                      target="_blank"
                      aria-label="Follow us on Facebook"
                      aria-describedby="new-window-facebook"
                      className="relative inline-flex w-10 h-10 p-4 bg-[#2b2b2b] text-[#C5A341] rounded-full justify-center items-center"
                    >
                      <Image
                        src="/layout/socialmedia/facebook.svg"
                        alt="facebook-logo"
                        aria-label="Follow us on Facebook"
                        aria-describedby="new-window-facebook"
                        height={25}
                        width={15}
                      />
                    </Link>
                    <Link
                      href="https://www.instagram.com/genroboticinnovations/"
                      target="_blank"
                      aria-label="Follow us on Instagram"
                      aria-describedby="new-window-instagram"
                      className="relative inline-flex w-10 h-10 p-3 bg-[#2b2b2b] text-[#C5A341] rounded-full justify-center items-center"
                    >
                      <Image
                        src="/layout/socialmedia/instagram.svg"
                        alt="instagram-logo"
                        aria-label="Follow us on Instagram"
                        aria-describedby="new-window-instagram"
                        height={25}
                        width={25}
                      />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/company/13393278/admin/dashboard/"
                      target="_blank"
                      aria-label="Follow us on LinkedIn"
                      aria-describedby="new-window-linkedin"
                      className="relative inline-flex w-10 h-10 p-3 bg-[#2b2b2b] text-[#C5A341] rounded-full justify-center items-center"
                    >
                      <Image
                        src="/layout/socialmedia/linkedin.svg"
                        alt="linkedin-logo"
                        height={25}
                        width={25}
                      />
                    </Link>
                    <Link
                      href="https://www.youtube.com/@genroboticinnovations"
                      target="_blank"
                      aria-label="Follow us on YouTube"
                      aria-describedby="new-window-youtube"
                      className="relative inline-flex w-10 h-10 p-3 bg-[#2b2b2b] text-[#C5A341] rounded-full justify-center items-center"
                    >
                      <Image
                        src="/layout/socialmedia/youtube.svg"
                        alt="youtube-logo"
                        height={25}
                        width={25}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4">
              <div className="flex-1 flex gap-8">
                <div className="w-fit mx-auto flex gap-8">
                  <Link href="/terms-conditions" className="text-white font-thin text-sm cursor-pointer decoration-0">
                    Terms & Conditions
                  </Link>
                  <Link href="/privacy-policy" className="text-white font-thin text-sm cursor-pointer decoration-0">
                    Privacy Policy
                  </Link>
                </div>
              </div>
              <div className="flex-1"></div>
              <div className="flex-1">
                <p className="text-white font-thin text-sm cursor-pointer w-fit mx-auto">
                  © 2025 Genrobotic Innovations Pvt. Ltd.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden bg-[#1b1b1b] px-8 py-8">
        <div className="divide-y divide-[#FCD901]/10">
          <div className="p-4">
            <div className="relative w-full md:w-96 mx-auto aspect-[125/32]">
              <Image src="/layout/gen-logo.svg" alt="gen-logo" fill />
            </div>
          </div>
          <div className="space-y-4 mb-4 pb-4">
            {/* <div className="flex">
              <Link
                href="https://drive.google.com/file/d/1nY-sa_t8Kjk3hUu9V69bGmraxYZZwuwU/view"
                className="px-6 py-2 rounded-lg text-xs bg-[#C5A341] w-fit mt-6 mx-auto"
                aria-label="Download E Brochure"
                aria-describedby="new-window-brochure"
              >
                Download E Brochure
              </Link>
            </div> */}
            <div>
              <p className="font-thin text-sm text-white text-center mb-2">
                Follow us on
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="https://x.com/GenRobotic"
                  target="_blank"
                  aria-label="Follow us on X"
                  aria-describedby="new-window-x"
                  className="relative inline-flex w-10 h-10 p-3 bg-[#2b2b2b] text-[#C5A341] rounded-full justify-center items-center"
                >
                  <Image
                    src="/layout/socialmedia/x.svg"
                    alt="x-logo"
                    height={25}
                    width={25}
                  />
                </Link>
                <span id="new-window-x" className="sr-only">Opens in new window</span>
                <Link
                  href="https://www.facebook.com/genrobotic"
                  target="_blank"
                  aria-label="Follow us on Facebook"
                  aria-describedby="new-window-facebook"
                  className="relative inline-flex w-10 h-10 p-4 bg-[#2b2b2b] text-[#C5A341] rounded-full justify-center items-center"
                >
                  <Image
                    src="/layout/socialmedia/facebook.svg"
                    alt="facebook-logo"
                    aria-label="Follow us on Facebook"
                    aria-describedby="new-window-facebook"
                    height={25}
                    width={15}
                  />
                </Link>
                <span id="new-window-facebook" className="sr-only">Opens in new window</span>
                <Link
                  href="https://www.instagram.com/genroboticinnovations/"
                  target="_blank"
                  aria-label="Follow us on Instagram"
                  aria-describedby="new-window-instagram"
                  className="relative inline-flex w-10 h-10 p-3 bg-[#2b2b2b] text-[#C5A341] rounded-full justify-center items-center"
                >
                  <Image
                    src="/layout/socialmedia/instagram.svg"
                    alt="instagram-logo"
                    height={25}
                    width={25}
                  />
                </Link>
                <span id="new-window-instagram" className="sr-only">Opens in new window</span>
                <Link
                  href="https://www.linkedin.com/company/13393278/admin/dashboard/"
                  target="_blank"
                  aria-label="Follow us on LinkedIn"
                  aria-describedby="new-window-linkedin"
                  className="relative inline-flex w-10 h-10 p-3 bg-[#2b2b2b] text-[#C5A341] rounded-full justify-center items-center"
                >
                  <Image
                    src="/layout/socialmedia/linkedin.svg"
                    alt="linkedin-logo"
                    height={25}
                    width={25}
                  />
                </Link>
                <span id="new-window-linkedin" className="sr-only">Opens in new window</span>
                <Link
                  href="https://www.youtube.com/@genroboticinnovations"
                  target="_blank"
                  aria-label="Follow us on YouTube"
                  aria-describedby="new-window-youtube"
                  className="relative inline-flex w-10 h-10 p-3 bg-[#2b2b2b] text-[#C5A341] rounded-full justify-center items-center"
                >
                  <Image
                    src="/layout/socialmedia/youtube.svg"
                    alt="youtube-logo"
                    height={25}
                    width={25}
                  />
                </Link>
                <span id="new-window-youtube" className="sr-only">Opens in new window</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Link href="/terms-conditions" className="text-[8px] text-white font-thin decoration-0">Terms & Conditions</Link>
          <p className="text-[8px] text-white font-thin">
            © 2025 Genrobotic Innovations Pvt. Ltd.
          </p>
          <Link href="/privacy-policy" className="text-[8px] text-white font-thin decoration-0">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
