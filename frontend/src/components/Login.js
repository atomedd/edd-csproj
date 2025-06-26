export default function Login() {
  const steamLoginUrl = "http://localhost:3165/api/auth/steam";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl mb-8">Login with Steam</h1>
      <a
        href={steamLoginUrl}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded"
      >
        Login via Steam
      </a>
    </div>
  );
}
