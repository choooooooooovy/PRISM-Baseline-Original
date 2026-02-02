import localFont from 'next/font/local';

// TODO: Add Pretendard font files to public/fonts/
// For now, using system fonts as fallback
export const pretendard = localFont({
  src: [
    // {
    //   path: '../public/fonts/Pretendard-Regular.woff2',
    //   weight: '400',
    //   style: 'normal',
    // },
    // {
    //   path: '../public/fonts/Pretendard-Medium.woff2',
    //   weight: '500',
    //   style: 'normal',
    // },
    // {
    //   path: '../public/fonts/Pretendard-SemiBold.woff2',
    //   weight: '600',
    //   style: 'normal',
    // },
    // {
    //   path: '../public/fonts/Pretendard-Bold.woff2',
    //   weight: '700',
    //   style: 'normal',
    // },
  ],
  variable: '--font-pretendard',
  display: 'swap',
  // Using system fonts as fallback
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
});
