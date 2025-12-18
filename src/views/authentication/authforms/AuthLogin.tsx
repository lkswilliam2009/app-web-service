import { useState } from "react";
import { useNavigate, Link } from 'react-router';
import { useAuth } from "src/context/AuthContext/AuthContext";
import { Button } from 'src/components/ui/button';
import { Checkbox } from 'src/components/ui/checkbox';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';

const AuthLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState(""); // username / email
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({
        username: identifier.includes("@") ? "" : identifier,
        email: identifier.includes("@") ? identifier : "",
        password,
      });

      navigate("/", { replace: true });
    } catch (err: any) {
      const backendError = err.response?.data;
      setError(
        backendError
          ? `[${backendError.code}] ${backendError.message}`
          : "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="mt-6">
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
            {error}
          </div>
        )}
        <div className="mb-4">
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
            placeholder="Enter username or email"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
            placeholder="Enter password"
            required
          />
        </div>
        <div className="flex justify-between my-5">
          <div className="flex items-center gap-2">
            <Checkbox id="accept" className="checkbox" />
            <Label htmlFor="accept" className="opacity-90 font-normal cursor-pointer">
              Remeber this Device
            </Label>
          </div>
          <Link to={'/'} className="text-primary text-sm font-medium">
            Forgot Password ?
          </Link>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition disabled:opacity-50"
        >
          {loading ? "Loging in..." : "Login"}
        </button>
      </form>
    </>
  );
};

export default AuthLogin;
