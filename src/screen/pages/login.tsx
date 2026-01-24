export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-panel p-8 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-6">Login to QuantEdge</h2>

        <input
          className="w-full bg-background p-3 rounded mb-4"
          placeholder="Email"
        />
        <input
          className="w-full bg-background p-3 rounded mb-6"
          placeholder="Password"
          type="password"
        />

        <button className="w-full bg-primary text-black py-3 rounded font-semibold">
          Login
        </button>
      </div>
    </div>
  );
}
