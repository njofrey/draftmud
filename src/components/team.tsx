"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ScrollView } from "./scroll-view";

const members = [
  {
    name: "Liam Brown",
    role: "Fundador - CEO",
    avatar: "https://alt.tailus.io/images/team/member-one.webp",
    link: "#",
  },
  {
    name: "Elijah Jones",
    role: "Co-Fundador - CTO",
    avatar: "https://alt.tailus.io/images/team/member-two.webp",
    link: "#",
  },
  {
    name: "Isabella Garcia",
    role: "Gerente de Ventas",
    avatar: "https://alt.tailus.io/images/team/member-three.webp",
    link: "#",
  },
  {
    name: "Henry Lee",
    role: "Ingeniero UX",
    avatar: "https://alt.tailus.io/images/team/member-four.webp",
    link: "#",
  },
  {
    name: "Ava Williams",
    role: "Diseñadora de Interacción",
    avatar: "https://alt.tailus.io/images/team/member-five.webp",
    link: "#",
  },
  {
    name: "Olivia Miller",
    role: "Diseñadora Visual",
    avatar: "https://alt.tailus.io/images/team/member-six.webp",
    link: "#",
  },
];

export default function TeamSection() {
  return (
    <section
      className="bg-gray-50 py-16 md:py-32 dark:bg-transparent"
      id="team"
    >
      <div className="mx-auto max-w-5xl border-t px-6">
        <span className="text-caption -ml-6 -mt-3.5 block w-max bg-gray-50 px-6 dark:bg-gray-950">
          Equipo
        </span>
        <ScrollView>
          <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
            <div className="sm:w-2/5">
              <h2 className="text-3xl font-bold sm:text-4xl">Nuestro equipo soñado</h2>
            </div>

            <div className="mt-6 sm:mt-0">
              <p>
                Durante el proceso de trabajo, realizamos ajustes regulares con el
                cliente porque es la única persona que puede sentir si un nuevo
                traje le queda bien o no.
              </p>
            </div>
          </div>
        </ScrollView>
        <div className="mt-12 md:mt-24">
          <ScrollView stagger delay={0.02}>
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member, index) => (
                <div key={index} className="group overflow-hidden">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                      },
                    }}
                  >
                    <img
                      className="h-96 w-full rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl"
                      src={member.avatar}
                      alt="team member"
                      width="826"
                      height="1239"
                    />
                    <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                      <div className="flex justify-between">
                        <h3 className="text-title text-base font-medium transition-all duration-500 group-hover:tracking-wider">
                          {member.name}
                        </h3>
                        <span className="text-xs">_0{index + 1}</span>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          {member.role}
                        </span>
                        <Link
                          href={member.link}
                          className="group-hover:text-primary-600 dark:group-hover:text-primary-400 inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100"
                        >
                          {" "}
                          Linktree
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </ScrollView>
        </div>
      </div>
    </section>
  );
}
