
import React from 'react';

// Generic Icon Props
type IconProps = React.SVGProps<SVGSVGElement>;

// --- SVG Strings for HTML Export ---
// Added class="html-export-icon" to each SVG string
const IconRestaurantSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>`;
const IconAccommodationSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M2.25 12l8.954 8.955c.44.439 1.152.439 1.591 0L21.75 12M2.25 12h19.5M12 2.25v19.5" /></svg>`;
const IconMuseumSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M8.25 21h7.5M12 6v9" /><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 6h4.5M9.75 9h4.5m-4.5 3h4.5M9.75 15h4.5" /></svg>`;
const IconCultureSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h3m-6.75 3h9.75m-1.5 3h-6.75m4.5 3h3.75M17.25 3v18M6.75 3v18" /><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5h7.5M8.25 16.5h7.5" /></svg>`;
const IconNatureSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 15.75l3-3 3 3 3-3 3 3M3.75 12.75l3-3 3 3 3-3 3 3M3.75 9.75l3-3 3 3 3-3 3 3" /><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.25L12 3 3.75 8.25" /></svg>`;
const IconParkSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18m0 0H9m3 0h3m-3 0a3 3 0 100-6 3 3 0 000 6zM6 9a6 6 0 1112 0 6 6 0 01-12 0z" /></svg>`;
const IconShoppingSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>`;
const IconFlightSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>`;
const IconTrainSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93s.844.17 1.25.02L17.66 4.72c.51-.166 1.054.12 1.21.638l.75 2.45c.15.49-.095.995-.578 1.152l-1.93.593a1.908 1.908 0 01-2.13-.266l-.52-.52a1.125 1.125 0 00-1.59 0l-.52.52a1.908 1.908 0 01-2.13.266L7.72 9.55c-.483-.157-.728-.662-.578-1.152l.75-2.45c.156-.517.7-.804 1.21-.638l1.45.474c.405.15.87.108 1.25-.02.396-.165.71-.505.78-.93l.149-.893zM10.343 17.657c.09.542.56.94 1.11.94h1.093c.55 0 1.02-.398 1.11.94l.149-.894c.07-.424.384-.764.78-.93.396-.165.844-.17 1.25.02l1.45.473c.51.167 1.054.12 1.21-.638l.75-2.45c.15-.49-.095-.995-.578-1.152l-1.93-.592a1.908 1.908 0 01-2.13-.267l-.52-.52a1.125 1.125 0 00-1.59 0l-.52.52a1.908 1.908 0 01-2.13.267l-1.93.593c-.483.157-.728-.662-.578-1.152l.75-2.45c.156-.517.7-.804 1.21-.638l1.45.473c.405.15.87.108 1.25-.02.396-.165.71-.505.78-.93l.149-.893z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75h10.5M6.75 12h10.5m-10.5-3.75h10.5" /></svg>`;
const IconBusSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-8.25V15M12 8.25v8.25m-4.5 0h9M3.75 6.75h16.5M3.75 15h16.5M5.25 6.75C5.25 5.645 6.145 4.5 7.5 4.5h9c1.355 0 2.25 1.145 2.25 2.25m-15 8.25c0 1.105.895 2.25 2.25 2.25h10.5c1.355 0 2.25-1.145 2.25-2.25" /><circle cx="7.5" cy="18.75" r="1.5" /><circle cx="16.5" cy="18.75" r="1.5" /></svg>`;
const IconCarSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5h10.5M4.125 14.25L5.25 6H18.75l1.125 8.25M4.125 14.25h15.75M4.125 14.25L2.25 12l1.875-2.25M19.875 14.25L21.75 12l-1.875-2.25" /></svg>`;
const IconWalkingSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5zm0 12.75a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12zm0-2.25a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12z" /><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 15.75A2.25 2.25 0 017.5 18v1.5a.75.75 0 01-1.5 0V18a3.75 3.75 0 013.75-3.75H12M14.25 15.75a2.25 2.25 0 002.25 2.25v1.5a.75.75 0 001.5 0V18a3.75 3.75 0 00-3.75-3.75H12" /></svg>`;
const IconInfoSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>`;
const IconTipSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.354a12.06 12.06 0 01-4.5 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 4.5A2.25 2.25 0 009.75 6.75v1.5a2.25 2.25 0 004.5 0v-1.5A2.25 2.25 0 0012 4.5z" /></svg>`;
const IconCostSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
const IconTimeSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
const IconActivitySVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.324l5.584.412a.563.563 0 01.309.958l-4.118 3.984a.563.563 0 00-.178.546l1.002 5.441a.563.563 0 01-.818.592l-4.992-2.706a.563.563 0 00-.546 0l-4.992 2.706a.563.563 0 01-.818-.592l1.002-5.441a.563.563 0 00-.178-.546l-4.118-3.984a.563.563 0 01.309-.958l5.584-.412a.563.563 0 00.475-.324l2.125-5.111z" /></svg>`;
const IconPhotoSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.174C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.173 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg>`;
const IconMapPinSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>`;
const IconLanguageSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502M9 5.25c2.671.283 4.915.932 6.666 2.08M17.25 9.75V3m0 6.75c.002.149.006.297.012.445M17.25 9.75c-.328 1.107-.736 2.13-1.206 3.098" /></svg>`;
const IconLuggageSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-1.5h5.25m-5.25 0h3M3.375 6.168c2.535.392 4.97.986 7.125 1.785A11.148 11.148 0 0010.5 8.25c0 3.866-2.59 7.13-6.125 8.085C3.895 16.536 3 17.418 3 18.336V12a2.25 2.25 0 012.25-2.25 2.25 2.25 0 012.25 2.25v-.336c.54-.168 1.11-.312 1.688-.432M20.625 6.168l-8.062 2.812-8.062-2.812C2.96 5.875 3 5.488 3 5.064V12a2.25 2.25 0 002.25 2.25 2.25 2.25 0 002.25-2.25v-.336c.54.168 1.11.312 1.688.432m11.437-5.408c-.164.032-.331.06-.5.085m-5.437 5.408c.54-.168 1.11-.312 1.688-.432M15 12V5.064c0-.424-.04-.811-.125-1.182A11.174 11.174 0 0110.5 3.75c-1.488 0-2.888.337-4.125.932m11.25 11.25h-5.25m5.25 0h3M18.625 16.085c.495.27.94.59.1326.932M15 18.336V12a2.25 2.25 0 012.25-2.25 2.25 2.25 0 012.25 2.25v.006c-.309.057-.612.12-.91.192M10.5 18.336V12a2.25 2.25 0 00-2.25-2.25A2.25 2.25 0 006 12v6.336c0 .918.895 1.799 2.375 1.799h3.25c1.48 0 2.375-.88 2.375-1.799z" /></svg>`;
const IconTrashSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c.34-.059.68-.111 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>`;
const IconPlusSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`;
const IconCheckboxCheckedSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>`;
const IconCheckboxUncheckedSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="currentColor" stroke-width="1"><path d="M10 18a8 8 0 100-16 8 8 0 000 16z" /></svg>`;
const IconPassportSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.5h16.5M3.75 7.5h16.5M3.75 10.5h16.5M3.75 13.5h16.5M3.75 16.5h16.5M3.75 19.5h16.5M5.25 4.5V2.25a2.25 2.25 0 012.25-2.25h9a2.25 2.25 0 012.25 2.25V4.5m-13.5 0V2.25" /><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 12h9M7.5 15h4.5M12 4.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 4.5z" /></svg>`;
const IconTransportSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-4.5-4.5L21 16.5m0 0L16.5 21M21 16.5H3" /></svg>`;
const IconStarSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 1a.75.75 0 01.687.45l1.975 4.004 4.41.64a.75.75 0 01.417 1.284l-3.19 3.107.754 4.392a.75.75 0 01-1.088.791L10 13.34l-3.957 2.08a.75.75 0 01-1.088-.79l.754-4.393-3.19-3.106a.75.75 0 01.417-1.285l4.41-.64L9.312 1.45A.75.75 0 0110 1z" clip-rule="evenodd" /></svg>`;
const IconStarOutlineSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10 1.25l1.545 3.14.34.69.76.11 3.454.502-2.5 2.436-.51.496.12.756.713 4.192L10 11.08l-3.091 1.625.713-4.191.12-.757-.51-.496-2.5-2.436 3.454-.502.76-.11.34-.69L10 1.25z" /></svg>`;
const IconRocketLaunchSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56v4.82a6 6 0 01-1.24-.04M15.59 14.37a6 6 0 00-5.84-7.38v4.82m5.84 2.56v-4.82a6 6 0 001.24.04M10 3v4.82a6 6 0 015.84 7.38M10 3a6 6 0 00-5.84 7.38m11.68 0a6 6 0 00-5.84-7.38M3.41 14.37a6 6 0 015.84-7.38m0 7.38v4.82a6 6 0 01-5.84-7.38M10 3a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 0010 21h4a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0014 3h-4z" /></svg>`;
const IconClockSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
const IconCurrentLocationSVG = `<svg class="html-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>`;


export const iconSvgMap: Record<string, string> = {
  RESTAURANT: IconRestaurantSVG,
  ACCOMMODATION: IconAccommodationSVG,
  MUSEUM: IconMuseumSVG,
  CULTURE: IconCultureSVG,
  NATURE: IconNatureSVG,
  PARK: IconParkSVG,
  SHOPPING: IconShoppingSVG,
  FLIGHT: IconFlightSVG,
  TRAIN: IconTrainSVG,
  BUS: IconBusSVG,
  CAR: IconCarSVG,
  WALKING: IconWalkingSVG,
  INFO: IconInfoSVG,
  TIP: IconTipSVG,
  COST: IconCostSVG,
  TIME: IconTimeSVG,
  ACTIVITY: IconActivitySVG,
  PHOTO: IconPhotoSVG,
  MAP_PIN: IconMapPinSVG,
  LANGUAGE: IconLanguageSVG,
  LUGGAGE: IconLuggageSVG,
  PASSPORT: IconPassportSVG,
  TRANSPORT: IconTransportSVG, 
  TRASH: IconTrashSVG,
  PLUS: IconPlusSVG,
  CHECKBOX_CHECKED: IconCheckboxCheckedSVG,
  CHECKBOX_UNCHECKED: IconCheckboxUncheckedSVG,
  STAR: IconStarSVG,
  STAR_OUTLINE: IconStarOutlineSVG,
  ROCKET_LAUNCH: IconRocketLaunchSVG,
  CLOCK: IconClockSVG,
  CURRENT_LOCATION: IconCurrentLocationSVG,
};


// --- React Components ---
export const IconRestaurant: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const IconAccommodation: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M2.25 12l8.954 8.955c.44.439 1.152.439 1.591 0L21.75 12M2.25 12h19.5M12 2.25v19.5" />
  </svg>
); 

export const IconMuseum: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M8.25 21h7.5M12 6v9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 6h4.5M9.75 9h4.5m-4.5 3h4.5M9.75 15h4.5" />
  </svg>
); 

export const IconCulture: React.FC<IconProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h3m-6.75 3h9.75m-1.5 3h-6.75m4.5 3h3.75M17.25 3v18M6.75 3v18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5h7.5M8.25 16.5h7.5" />
  </svg>
); 

export const IconNature: React.FC<IconProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 15.75l3-3 3 3 3-3 3 3M3.75 12.75l3-3 3 3 3-3 3 3M3.75 9.75l3-3 3 3 3-3 3 3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.25L12 3 3.75 8.25" />
  </svg>
); 

export const IconPark: React.FC<IconProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0 0H9m3 0h3m-3 0a3 3 0 100-6 3 3 0 000 6zM6 9a6 6 0 1112 0 6 6 0 01-12 0z" />
  </svg> 
);

export const IconShopping: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

export const IconFlight: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

export const IconTrain: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93s.844.17 1.25.02L17.66 4.72c.51-.166 1.054.12 1.21.638l.75 2.45c.15.49-.095.995-.578 1.152l-1.93.593a1.908 1.908 0 01-2.13-.266l-.52-.52a1.125 1.125 0 00-1.59 0l-.52.52a1.908 1.908 0 01-2.13.266L7.72 9.55c-.483-.157-.728-.662-.578-1.152l.75-2.45c.156-.517.7-.804 1.21-.638l1.45.474c.405.15.87.108 1.25-.02.396-.165.71-.505.78-.93l.149-.893zM10.343 17.657c.09.542.56.94 1.11.94h1.093c.55 0 1.02-.398 1.11.94l.149-.894c.07-.424.384-.764.78-.93.396-.165.844-.17 1.25.02l1.45.473c.51.167 1.054.12 1.21-.638l.75-2.45c.15-.49-.095-.995-.578-1.152l-1.93-.592a1.908 1.908 0 01-2.13-.267l-.52-.52a1.125 1.125 0 00-1.59 0l-.52.52a1.908 1.908 0 01-2.13.267l-1.93.593c-.483.157-.728-.662-.578-1.152l.75-2.45c.156-.517.7-.804 1.21-.638l1.45.473c.405.15.87.108 1.25-.02.396-.165.71-.505.78-.93l.149-.893z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75h10.5M6.75 12h10.5m-10.5-3.75h10.5" />
  </svg>
);

export const IconBus: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-8.25V15M12 8.25v8.25m-4.5 0h9M3.75 6.75h16.5M3.75 15h16.5M5.25 6.75C5.25 5.645 6.145 4.5 7.5 4.5h9c1.355 0 2.25 1.145 2.25 2.25m-15 8.25c0 1.105.895 2.25 2.25 2.25h10.5c1.355 0 2.25-1.145 2.25-2.25" />
    <circle cx="7.5" cy="18.75" r="1.5" />
    <circle cx="16.5" cy="18.75" r="1.5" />
  </svg>
);

export const IconCar: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5h10.5M4.125 14.25L5.25 6H18.75l1.125 8.25M4.125 14.25h15.75M4.125 14.25L2.25 12l1.875-2.25M19.875 14.25L21.75 12l-1.875-2.25" />
  </svg>
);

export const IconWalking: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5zm0 12.75a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H12zm0-2.25a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 15.75A2.25 2.25 0 017.5 18v1.5a.75.75 0 01-1.5 0V18a3.75 3.75 0 013.75-3.75H12M14.25 15.75a2.25 2.25 0 002.25 2.25v1.5a.75.75 0 001.5 0V18a3.75 3.75 0 00-3.75-3.75H12" />
  </svg>
);


export const IconInfo: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </svg>
);

export const IconTip: React.FC<IconProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.354a12.06 12.06 0 01-4.5 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 4.5A2.25 2.25 0 009.75 6.75v1.5a2.25 2.25 0 004.5 0v-1.5A2.25 2.25 0 0012 4.5z" />
  </svg>
);

export const IconCost: React.FC<IconProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const IconTime: React.FC<IconProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const IconActivity: React.FC<IconProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.324l5.584.412a.563.563 0 01.309.958l-4.118 3.984a.563.563 0 00-.178.546l1.002 5.441a.563.563 0 01-.818.592l-4.992-2.706a.563.563 0 00-.546 0l-4.992 2.706a.563.563 0 01-.818-.592l1.002-5.441a.563.563 0 00-.178-.546l-4.118-3.984a.563.563 0 01.309-.958l5.584-.412a.563.563 0 00.475-.324l2.125-5.111z" />
  </svg>
);

export const IconPhoto: React.FC<IconProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.174C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.173 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
  </svg>
);

export const IconMapPin: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

export const IconLanguage: React.FC<IconProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502M9 5.25c2.671.283 4.915.932 6.666 2.08M17.25 9.75V3m0 6.75c.002.149.006.297.012.445M17.25 9.75c-.328 1.107-.736 2.13-1.206 3.098" />
  </svg>
);

export const IconLuggage: React.FC<IconProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-1.5h5.25m-5.25 0h3M3.375 6.168c2.535.392 4.97.986 7.125 1.785A11.148 11.148 0 0010.5 8.25c0 3.866-2.59 7.13-6.125 8.085C3.895 16.536 3 17.418 3 18.336V12a2.25 2.25 0 012.25-2.25 2.25 2.25 0 012.25 2.25v-.336c.54-.168 1.11-.312 1.688-.432M20.625 6.168l-8.062 2.812-8.062-2.812C2.96 5.875 3 5.488 3 5.064V12a2.25 2.25 0 002.25 2.25 2.25 2.25 0 002.25-2.25v-.336c.54.168 1.11.312 1.688.432m11.437-5.408c-.164.032-.331.06-.5.085m-5.437 5.408c.54-.168 1.11-.312 1.688-.432M15 12V5.064c0-.424-.04-.811-.125-1.182A11.174 11.174 0 0110.5 3.75c-1.488 0-2.888.337-4.125.932m11.25 11.25h-5.25m5.25 0h3M18.625 16.085c.495.27.94.59.1326.932M15 18.336V12a2.25 2.25 0 012.25-2.25 2.25 2.25 0 012.25 2.25v.006c-.309.057-.612.12-.91.192M10.5 18.336V12a2.25 2.25 0 00-2.25-2.25A2.25 2.25 0 006 12v6.336c0 .918.895 1.799 2.375 1.799h3.25c1.48 0 2.375-.88 2.375-1.799z" />
  </svg>
);

export const IconTrash: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c.34-.059.68-.111 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

export const IconPlus: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const IconCheckboxChecked: React.FC<IconProps> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
 </svg>
);

export const IconCheckboxUnchecked: React.FC<IconProps> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1" {...props}>
   <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" />
 </svg>
);

export const IconPassport: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5h16.5M3.75 7.5h16.5M3.75 10.5h16.5M3.75 13.5h16.5M3.75 16.5h16.5M3.75 19.5h16.5M5.25 4.5V2.25a2.25 2.25 0 012.25-2.25h9a2.25 2.25 0 012.25 2.25V4.5m-13.5 0V2.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12h9M7.5 15h4.5M12 4.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 4.5z" />
  </svg>
);

export const IconTransport: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-4.5-4.5L21 16.5m0 0L16.5 21M21 16.5H3" />
  </svg>
);

export const IconStar: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10 1a.75.75 0 01.687.45l1.975 4.004 4.41.64a.75.75 0 01.417 1.284l-3.19 3.107.754 4.392a.75.75 0 01-1.088.791L10 13.34l-3.957 2.08a.75.75 0 01-1.088-.79l.754-4.393-3.19-3.106a.75.75 0 01.417-1.285l4.41-.64L9.312 1.45A.75.75 0 0110 1z" clipRule="evenodd" />
  </svg>
);

export const IconStarOutline: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={1.5} stroke="currentColor" {...props}>
     <path strokeLinecap="round" strokeLinejoin="round" d="M10 1.25l1.545 3.14.34.69.76.11 3.454.502-2.5 2.436-.51.496.12.756.713 4.192L10 11.08l-3.091 1.625.713-4.191.12-.757-.51-.496-2.5-2.436 3.454-.502.76-.11.34-.69L10 1.25z" />
  </svg>
);

export const IconRocketLaunch: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56v4.82a6 6 0 01-1.24-.04M15.59 14.37a6 6 0 00-5.84-7.38v4.82m5.84 2.56v-4.82a6 6 0 001.24.04M10 3v4.82a6 6 0 015.84 7.38M10 3a6 6 0 00-5.84 7.38m11.68 0a6 6 0 00-5.84-7.38M3.41 14.37a6 6 0 015.84-7.38m0 7.38v4.82a6 6 0 01-5.84-7.38M10 3a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 0010 21h4a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0014 3h-4z" />
    </svg>
);

export const IconClock: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const IconCurrentLocation: React.FC<IconProps> = (props) => ( // Using MapPin as CurrentLocation
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

export const IconWandSparkles: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-4.471-3.74-3.74H7.5a3 3 0 01-3-3V7.5A3 3 0 017.5 4.5h7.532l3.74 3.74-.569 4.471 2.51 2.225-1.358 5.072zM15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-4.471-3.74-3.74H7.5a3 3 0 01-3-3V7.5A3 3 0 017.5 4.5h7.532l3.74 3.74-.569 4.471 2.51 2.225-1.358 5.072z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 21.75h4.5M12 2.25v4.5M4.5 12H2.25m19.5 0h-2.25m-15-4.5l1.06 1.06M17.25 6.75l1.06-1.06" />
  </svg>
);

export const IconBolt: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);
