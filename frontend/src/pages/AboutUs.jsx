import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap, Users, Trophy } from "lucide-react";
import Footer from "../components/Footer";

export default function AboutUs() {
    const stats = [
        { label: "Active Users", value: "2.5M+" },
        { label: "Cities Covered", value: "400+" },
    ];

    const values = [
        {
            icon: Zap,
            title: "Lightning Fast",
            desc: "Our tech infrastructure ensures that your applications are processed instantly, minimizing wait times and accelerating approvals.",
        },
        {
            icon: ShieldCheck,
            title: "Bank-Grade Security",
            desc: "We utilize 256-bit encryption and strict data privacy measures to keep your personal information completely secure.",
        },
        {
            icon: Users,
            title: "Customer First",
            desc: "Every design decision we make is aimed at providing a seamless, transparent, and empathetic experience for our users.",
        },
        {
            icon: Trophy,
            title: "Industry Leading",
            desc: "Recognized by top financial publications for our innovative approach to simplifying lending and democratic access to finance.",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-blue-700 py-24 sm:py-32">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-flex items-center gap-2 rounded-full bg-blue-600/50 backdrop-blur-md px-4 py-1.5 text-sm font-semibold text-blue-100 ring-1 ring-white/20">
                            <CheckCircle2 size={16} /> Our Mission
                        </span>
                        <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                            Simplifying Finance, <br />
                            <span className="text-blue-200">Empowering Lives</span>
                        </h1>
                        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-blue-100 sm:text-xl">
                            At KreditKonnect, we believe that access to credit should be simple, transparent, and fast. We are building the future of digitized lending to bring financial freedom to everyone.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative -mt-16 z-20 mx-auto w-full max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="rounded-3xl bg-white p-8 shadow-2xl shadow-blue-900/5 ring-1 ring-slate-100 sm:p-12"
                >
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <p className="text-3xl sm:text-5xl font-extrabold tracking-tight text-blue-600">
                                    {stat.value}
                                </p>
                                <p className="mt-2 text-sm sm:text-base font-medium text-slate-500 uppercase tracking-wider">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Story / Values Section */}
            <section className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Built on Trust and Innovation
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            Since our inception, we've remained obsessed with dismantling the friction associated with traditional loans. Our core values drive everything we do.
                        </p>
                    </div>

                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                            {values.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-lg"
                                    >
                                        <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-slate-900">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                                <Icon size={24} />
                                            </div>
                                            {feature.title}
                                        </dt>
                                        <dd className="mt-6 flex flex-auto flex-col text-base leading-7 text-slate-600">
                                            <p className="flex-auto">{feature.desc}</p>
                                        </dd>
                                    </motion.div>
                                );
                            })}
                        </dl>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
