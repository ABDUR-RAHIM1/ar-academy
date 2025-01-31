
import Header from '@/components/clients/header/Header';
import '../globals.css'
import DashboardState from '@/contextApi/DashboardState';

export const metadata = {
  title: "AR Academy - Learn Your Favorite Subjects",
  description: "AR Academy offers an engaging learning platform with diverse subjects and chapters for students to learn at their own pace.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true" >
        <DashboardState>
          <Header />
          {children}
        </DashboardState>
      </body>
    </html>
  );
}
