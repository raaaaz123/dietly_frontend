import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Data Deletion - Dietly AI',
  description: 'How to request deletion of your account and data on Dietly AI.',
};

export default function DeleteAccount() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-24">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">Data Deletion Request</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
          <p className="text-lg">
            At Dietly AI, we believe you should have complete control over your personal data. 
            If you wish to delete your account and all associated data, you can do so at any time.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Option 1: Delete via the App (Fastest)</h2>
          <p>
            You can instantly and permanently delete your account directly within the Dietly AI mobile application:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mt-4">
            <li>Open the Dietly AI app on your device.</li>
            <li>Tap on your <strong>Profile</strong> tab.</li>
            <li>Scroll to the bottom of the page.</li>
            <li>Tap <strong>Delete Account</strong>.</li>
            <li>Confirm the deletion in the prompt.</li>
          </ol>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            * Note: This will instantly wipe all of your meal logs, health metrics, and account credentials from our servers.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Option 2: Email Request</h2>
          <p>
            If you no longer have access to the app, you can request manual deletion of your account by contacting our support team:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Email us at: <a href="mailto:support@dietly.life" className="text-blue-600 dark:text-blue-400 hover:underline">support@dietly.life</a></li>
            <li>Subject: <strong>Account Deletion Request</strong></li>
            <li>Body: Please include the email address associated with your Dietly AI account.</li>
          </ul>
          <p>
            We will process your request and permanently delete your data within 7 business days.
          </p>

          <div className="mt-12 p-6 bg-gray-100 dark:bg-zinc-900 rounded-xl">
            <h3 className="font-bold mb-2">What data is deleted?</h3>
            <p className="text-sm">
              Upon account deletion, all personal identifiers, connected OAuth credentials, body metrics, meal logs, scanned food photos, AI chat histories, and gamification streaks are permanently erased from our production databases.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
