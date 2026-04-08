"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import "./login.css";

export default function LoginPage() {
     const router = useRouter();
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [error, setError] = useState("");
     const [loading, setLoading] = useState(false);

     async function handleSubmit(e: React.FormEvent) {
          e.preventDefault();
          setLoading(true);
          setError("");

          const res = await signIn("credentials", {
               email,
               password,
               redirect: false,
          });

          if(res?.error) {
               setError("Email ou mot de passe incorect.");
               setLoading(false);
               return;
          }

          router.push("/");
     }

     return (
          <div className="login-container">
               <div className="login-left">
                    <div className="login-brand">
                         <span className="login-brand-name">am solutio</span>
                    </div>

                    <div className="login-hero-text">
                         <h1>Bon<br />retour</h1>
                         <p>Accédez à toutes vos solutions depuis un seul endroit</p>
                    </div>
               </div>

               <div className="login-right">
                    <div className="login-form-wrapper">
                         <div className="login-form-header">
                              <h2>Connexion</h2>
                              <p>Pas encore de conmpt ? <Link href="Register" className="login-link">S'inscrire</Link></p>
                         </div>

                         <form onSubmit={handleSubmit} className="login-form">
                              <div className="login-field">
                                   <label htmlFor="email">Email</label>
                                   <input 
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="vous@exemple.com"
                                        required
                                        autoComplete="email"
                                   />
                              </div>

                              <div className="login-field">
                                   <label htmlFor="password">Mot de passe</label>
                                   <input 
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        autoComplete="current-password"
                                   />
                              </div>

                              {error && <p className="login-error">{error}</p>}

                              <Button variant="action" type="submit" disabled={loading}>
                                   {loading ? "Connexion..." : "Se connecter"}
                              </Button>
                         </form>
                    </div>
               </div>
          </div>
     );
}