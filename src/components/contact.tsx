"use client";
import { Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function FeaturesSection() {
  return (
    <section id="contact" className="py-16 md:py-32 bg-gray-50 dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
          <div className="lg:col-span-2">
            <div className="md:pr-6 lg:pr-0">
              <h2 className="text-4xl font-semibold lg:text-5xl text-center md:text-left">
                Hablemos de tu proyecto
              </h2>
            </div>
            <ul className="mt-8 space-y-4 *:flex *:items-center *:gap-3 *:py-3 *:justify-center md:*:justify-start *:border-b *:border-gray-200 dark:*:border-gray-700 *:pb-3 *:max-w-xs *:mx-auto md:*:mx-0">
              <li>
                <Link href="#link" className="hover:text-accent-foreground">
                  <Mail className="size-5 mr-2 inline" />
                  <span>contacto@estudiomud.com</span>
                </Link>
              </li>
              <li>
                <Link href="#link" className="hover:text-accent-foreground">
                  <MapPin className="size-5 mr-2 inline" />
                  <span>Vitacura, Santiago</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <Card className="mx-auto mt-12 max-w-lg p-8 shadow-md sm:p-16 w-full">
                <div>
                  <h3 className="text-lg font-semibold">
                    Queremos conocer tu marca
                  </h3>
                  <p className="mt-4 text-sm">
                    Déjanos tus datos y te responderemos a la brevedad para explorar cómo podemos trabajar juntos.
                  </p>
                </div>

                <form
                  action="https://formspree.io/f/mjkepqyo"
                  method="POST"
                  className="**:[&>label]:block mt-6 space-y-6 *:space-y-3"
                  onSubmit={(e) => {
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get('name');
                    const params = new URLSearchParams();
                    params.set('success', 'true');
                    if (name) {
                      params.set('name', name.toString());
                    }
                    const nextUrl = `${window.location.origin}/gracias?${params.toString()}`;
                    const hiddenInput = e.currentTarget.querySelector('input[name="_next"]') as HTMLInputElement;

                    if (hiddenInput) {
                      hiddenInput.value = nextUrl;
                    }
                  }}
                >
                  <input type="hidden" name="_next" value={`${typeof window !== 'undefined' ? window.location.origin : ''}/gracias`} />

                  <div>
                    <Label htmlFor="name">Nombre</Label>
                    <Input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      pattern="[A-Za-z\s]+"
                      title="Solo se permiten letras y espacios"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" name="email" required />
                  </div>

                  {/* <div>
                            <Label htmlFor="country">Country/Region</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Country/Region" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">DR Congo</SelectItem>
                                    <SelectItem value="2">United States</SelectItem>
                                    <SelectItem value="3">France</SelectItem>
                                </SelectContent>
                            </Select>
                        </div> */}

                  {/* <div>
                            <Label htmlFor="website">Company Website</Label>
                            <Input type="url" id="website" />
                            <span className="text-muted-foreground inline-block text-sm">Must start with 'https'</span>
                        </div> */}

                  {/* <div>
                            <Label htmlFor="job">Job function</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Job Function" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Finance</SelectItem>
                                    <SelectItem value="2">Education</SelectItem>
                                    <SelectItem value="3">Legal</SelectItem>
                                    <SelectItem value="4">More</SelectItem>
                                </SelectContent>
                            </Select>
                        </div> */}

                  <div>
                    <Label htmlFor="msg">Mensaje</Label>
                    <Textarea id="msg" name="message" rows={3} required />
                  </div>

                  <Button type="submit">Enviar</Button>
                </form>
              </Card>
          </div>
        </div>
      </div>
    </section>
  );
}