"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  MeshTransmissionMaterial,
  OrbitControls,
  Sparkles,
} from "@react-three/drei";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const jobs = [
  {
    id: "01",
    title: "Sales Executive",
    department: "SALES",
    description:
      "Turn conversations into customers and help grow the Caspian Host ecosystem.",
    skills: ["SALES", "COMMUNICATION", "REMOTE"],
    href: "/sales-application",
  },
  {
    id: "02",
    title: "Customer Support",
    department: "SUPPORT",
    description:
      "Be the person customers can rely on when they need help.",
    skills: ["SUPPORT", "COMMUNICATION", "REMOTE"],
    href: "/customer-support-application",
  },
  {
    id: "03",
    title: "Technical Support",
    department: "TECHNICAL",
    description:
      "Work with Linux, servers, networking and the infrastructure behind our platform.",
    skills: ["LINUX", "PROXMOX", "PTERODACTYL"],
    href: "/technical-support-application",
  },
];

/* =========================================================
   3D CORE
========================================================= */

function Core() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    group.current.rotation.y = state.clock.elapsedTime * 0.18;

    group.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.35) * 0.12;
  });

  return (
    <group ref={group}>
      {[2.1, 2.5, 2.9].map((size, index) => (
        <mesh
          key={size}
          rotation={[
            index * 0.7,
            index * 0.45,
            index * 0.35,
          ]}
        >
          <torusGeometry args={[size, 0.012, 16, 160]} />

          <meshBasicMaterial
            color={index === 1 ? "#38bdf8" : "#2563eb"}
            transparent
            opacity={0.55}
          />
        </mesh>
      ))}

      <mesh>
        <icosahedronGeometry args={[1.45, 4]} />

        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1.2}
          chromaticAberration={0.08}
          anisotropy={0.3}
          distortion={0.35}
          distortionScale={0.4}
          temporalDistortion={0.15}
          transmission={1}
          roughness={0.08}
          color="#38bdf8"
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.72, 64, 64]} />

        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.22}
        />
      </mesh>

      <Sparkles
        count={80}
        scale={[5, 5, 5]}
        size={2}
        speed={0.35}
      />
    </group>
  );
}

function ServerCore() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 42,
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />

        <pointLight
          position={[3, 3, 4]}
          intensity={15}
          color="#38bdf8"
        />

        <pointLight
          position={[-4, -2, 3]}
          intensity={10}
          color="#2563eb"
        />

        <Float
          speed={1.5}
          rotationIntensity={0.25}
          floatIntensity={0.7}
        >
          <Core />
        </Float>

        <Environment preset="night" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          minPolarAngle={Math.PI / 2.3}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  );
}

/* =========================================================
   GRID
========================================================= */

function Grid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.055)_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[150px]" />

      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
    </div>
  );
}

/* =========================================================
   MAGNETIC BUTTON
========================================================= */

function MagneticButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 250,
    damping: 20,
  });

  const springY = useSpring(y, {
    stiffness: 250,
    damping: 20,
  });

  return (
    <motion.a
      href="#positions"
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        x.set(
          (e.clientX -
            (rect.left + rect.width / 2)) *
            0.18
        );

        y.set(
          (e.clientY -
            (rect.top + rect.height / 2)) *
            0.18
        );
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="group relative inline-flex overflow-hidden rounded-full border border-cyan-300/40 bg-cyan-400 px-8 py-4 text-sm font-black tracking-wide text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.25)]"
    >
      <span className="absolute inset-0 -translate-x-full bg-white/50 transition-transform duration-500 group-hover:translate-x-full" />

      <span className="relative">
        {children}
      </span>
    </motion.a>
  );
}

/* =========================================================
   NEW 3D FEATURE SLIDER
========================================================= */

function ThreeDFeatureSlider() {
  const features = [
    {
      number: "01",
      title: "REMOTE",
      subtitle: "WORK WITHOUT WALLS",
      description:
        "Do your best work from wherever you are. We care about results, not where your desk happens to be.",
      icon: "◉",
      stat: "100%",
      statLabel: "REMOTE",
    },
    {
      number: "02",
      title: "GROWTH",
      subtitle: "BUILD YOUR SKILLS",
      description:
        "Work with real infrastructure, real servers and real problems. Every challenge is an opportunity to become better.",
      icon: "↗",
      stat: "∞",
      statLabel: "POTENTIAL",
    },
    {
      number: "03",
      title: "FLEXIBLE",
      subtitle: "PEOPLE FIRST",
      description:
        "We believe great work comes from people who have room to think, experiment and work in a way that suits them.",
      icon: "◌",
      stat: "24/7",
      statLabel: "TEAM",
    },
    {
      number: "04",
      title: "IMPACT",
      subtitle: "MAKE SOMETHING REAL",
      description:
        "Your work doesn't sit unused. It directly affects our customers, infrastructure and the future of Caspian Host.",
      icon: "✦",
      stat: "1K+",
      statLabel: "CLIENTS",
    },
  ];

  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  const activeRef = useRef(0);
  const animatingRef = useRef(false);

  const animationTimer =
    useRef<number | null>(null);

  const touchY =
    useRef<number | null>(null);

  const changeCard = (
    next: number
  ) => {
    if (
      animatingRef.current ||
      next < 0 ||
      next >= features.length
    ) {
      return false;
    }

    animatingRef.current = true;
    setAnimating(true);

    activeRef.current = next;
    setActive(next);

    if (animationTimer.current) {
      window.clearTimeout(
        animationTimer.current
      );
    }

    animationTimer.current =
      window.setTimeout(() => {
        animatingRef.current = false;
        setAnimating(false);
      }, 850);

    return true;
  };

  const isInCenterZone = () => {
    const element = sectionRef.current;

    if (!element) return false;

    const rect =
      element.getBoundingClientRect();

    const center =
      window.innerHeight / 2;

    const elementCenter =
      rect.top + rect.height / 2;

    return (
      Math.abs(
        elementCenter - center
      ) <
      window.innerHeight * 0.3
    );
  };

  /* =====================================================
     WHEEL
  ===================================================== */

  useEffect(() => {
    const onWheel = (
      event: WheelEvent
    ) => {
      if (window.innerWidth < 768)
        return;

      if (!isInCenterZone())
        return;

      if (
        Math.abs(event.deltaY) < 8
      )
        return;

      const current =
        activeRef.current;

      const down =
        event.deltaY > 0;

      if (
        current === 0 &&
        !down
      ) {
        return;
      }

      if (
        current ===
          features.length - 1 &&
        down
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (animatingRef.current)
        return;

      changeCard(
        down
          ? current + 1
          : current - 1
      );
    };

    window.addEventListener(
      "wheel",
      onWheel,
      {
        passive: false,
        capture: true,
      }
    );

    return () => {
      window.removeEventListener(
        "wheel",
        onWheel,
        true
      );
    };
  }, []);

  /* =====================================================
     TOUCH
  ===================================================== */

  useEffect(() => {
    const onTouchStart = (
      event: TouchEvent
    ) => {
      touchY.current =
        event.touches[0]?.clientY ??
        null;
    };

    const onTouchMove = (
      event: TouchEvent
    ) => {
      if (window.innerWidth >= 768)
        return;

      if (
        !isInCenterZone() ||
        touchY.current === null
      )
        return;

      const currentY =
        event.touches[0]?.clientY ??
        touchY.current;

      const delta =
        touchY.current - currentY;

      if (Math.abs(delta) < 35)
        return;

      const current =
        activeRef.current;

      const down = delta > 0;

      if (
        current === 0 &&
        !down
      ) {
        return;
      }

      if (
        current ===
          features.length - 1 &&
        down
      ) {
        return;
      }

      if (animatingRef.current)
        return;

      event.preventDefault();

      changeCard(
        down
          ? current + 1
          : current - 1
      );

      touchY.current = currentY;
    };

    const onTouchEnd = () => {
      touchY.current = null;
    };

    window.addEventListener(
      "touchstart",
      onTouchStart,
      {
        passive: true,
        capture: true,
      }
    );

    window.addEventListener(
      "touchmove",
      onTouchMove,
      {
        passive: false,
        capture: true,
      }
    );

    window.addEventListener(
      "touchend",
      onTouchEnd,
      {
        passive: true,
        capture: true,
      }
    );

    return () => {
      window.removeEventListener(
        "touchstart",
        onTouchStart,
        true
      );

      window.removeEventListener(
        "touchmove",
        onTouchMove,
        true
      );

      window.removeEventListener(
        "touchend",
        onTouchEnd,
        true
      );
    };
  }, []);

  /* =====================================================
     CLEANUP
  ===================================================== */

  useEffect(() => {
    return () => {
      if (animationTimer.current) {
        window.clearTimeout(
          animationTimer.current
        );
      }
    };
  }, []);

  /* =====================================================
     CARD POSITION
  ===================================================== */

  const getPosition = (
    index: number
  ) => {
    const relative =
      index - active;

    if (relative === 0) {
      return {
        x: 0,
        y: 0,
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        opacity: 1,
        z: 50,
      };
    }

    if (relative === 1) {
      return {
        x: 90,
        y: 35,
        scale: 0.88,
        rotateY: -14,
        rotateX: 4,
        opacity: 0.6,
        z: 40,
      };
    }

    if (relative === 2) {
      return {
        x: 145,
        y: 75,
        scale: 0.77,
        rotateY: -22,
        rotateX: 7,
        opacity: 0.22,
        z: 30,
      };
    }

    if (relative === 3) {
      return {
        x: 180,
        y: 105,
        scale: 0.67,
        rotateY: -28,
        rotateX: 10,
        opacity: 0.08,
        z: 20,
      };
    }

    if (relative === -1) {
      return {
        x: -90,
        y: -35,
        scale: 0.88,
        rotateY: 14,
        rotateX: -4,
        opacity: 0.12,
        z: 40,
      };
    }

    return {
      x: -160,
      y: -70,
      scale: 0.76,
      rotateY: 22,
      rotateX: -7,
      opacity: 0,
      z: 10,
    };
  };

  return (
    <div
      ref={sectionRef}
      className="relative"
    >
      {/* HEADER */}

      <div className="mb-10 flex items-center justify-between">
        <div>
          <div className="font-mono text-[9px] tracking-[0.3em] text-slate-600">
            EXPERIENCE_MODULE_
            <span className="text-cyan-400">
              {String(active + 1).padStart(
                2,
                "0"
              )}
            </span>
          </div>

          <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-700">
            Scroll through the system
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={
              active === 0 ||
              animating
            }
            onClick={() =>
              changeCard(active - 1)
            }
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-500 transition hover:border-cyan-400/40 hover:text-cyan-400 disabled:opacity-20"
          >
            ←
          </button>

          <button
            type="button"
            disabled={
              active ===
                features.length - 1 ||
              animating
            }
            onClick={() =>
              changeCard(active + 1)
            }
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-500 transition hover:border-cyan-400/40 hover:text-cyan-400 disabled:opacity-20"
          >
            →
          </button>
        </div>
      </div>

      {/* =================================================
          3D STAGE
      ================================================= */}

      <div
        className="relative mx-auto h-[470px] w-full max-w-4xl sm:h-[500px]"
        style={{
          perspective: "1600px",
          touchAction: "pan-y",
        }}
      >
        {/* CENTRAL ORB */}

        <motion.div
          animate={{
            scale: animating
              ? [1, 1.08, 1]
              : 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-36 w-36 -translate-x-1/2 -translate-y-1/2 sm:h-44 sm:w-44"
        >
          <div className="absolute inset-0 rounded-full border border-cyan-400/20" />

          <div className="absolute inset-3 rounded-full border border-cyan-400/10" />

          <div className="absolute inset-7 rounded-full bg-cyan-400/[0.04] shadow-[0_0_100px_rgba(34,211,238,0.15)] backdrop-blur-sm" />

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-1 rounded-full border border-dashed border-cyan-400/20"
          />

          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_25px_#22d3ee]" />

          <div className="absolute left-1/2 top-[calc(50%+18px)] -translate-x-1/2 whitespace-nowrap font-mono text-[7px] tracking-[0.3em] text-cyan-400/50">
            CASPIAN_CORE
          </div>
        </motion.div>

        {/* ORBIT RINGS */}

        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/[0.05]"
        />

        <motion.div
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[390px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-blue-400/[0.06]"
        />

        {/* CARDS */}

        {features.map(
          (feature, index) => {
            const position =
              getPosition(index);

            return (
              <motion.div
                key={feature.number}
                initial={false}
                animate={{
                  x: `${position.x}%`,
                  y: `${position.y}%`,
                  scale: position.scale,
                  rotateY:
                    position.rotateY,
                  rotateX:
                    position.rotateX,
                  opacity:
                    position.opacity,
                }}
                transition={{
                  duration: 0.8,
                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
                className="absolute left-1/2 top-1/2 z-20 h-[285px] w-[260px] origin-center sm:h-[305px] sm:w-[285px]"
                style={{
                  marginLeft:
                    "-130px",
                  marginTop:
                    "-142px",
                  transformStyle:
                    "preserve-3d",
                  zIndex:
                    position.z,
                  pointerEvents:
                    index === active
                      ? "auto"
                      : "none",
                }}
              >
                <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-cyan-400/20 bg-[#071019]/90 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                  {/* TOP LIGHT */}

                  <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

                  {/* GLOW */}

                  <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-cyan-400/[0.08] blur-[70px]" />

                  <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-blue-600/[0.08] blur-[70px]" />

                  {/* BIG NUMBER */}

                  <div className="pointer-events-none absolute -bottom-5 -right-2 text-[9rem] font-black leading-none tracking-[-0.12em] text-white/[0.025]">
                    {
                      feature.number
                    }
                  </div>

                  <div className="relative flex h-full flex-col justify-between">
                    {/* TOP */}

                    <div className="flex items-center justify-between">
                      <div className="font-mono text-[9px] tracking-[0.25em] text-cyan-400">
                        MODULE_
                        {
                          feature.number
                        }
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-lg text-cyan-400">
                        {
                          feature.icon
                        }
                      </div>
                    </div>

                    {/* CENTER */}

                    <div>
                      <div className="mb-2 text-[7px] font-bold tracking-[0.3em] text-slate-600">
                        {
                          feature.subtitle
                        }
                      </div>

                      <h3 className="text-4xl font-black tracking-[-0.07em]">
                        {
                          feature.title
                        }
                      </h3>

                      <p className="mt-3 text-[11px] leading-5 text-slate-500">
                        {
                          feature.description
                        }
                      </p>
                    </div>

                    {/* BOTTOM */}

                    <div className="flex items-end justify-between border-t border-white/[0.06] pt-4">
                      <div>
                        <div className="text-2xl font-black">
                          {
                            feature.stat
                          }
                        </div>

                        <div className="mt-1 text-[7px] font-bold tracking-[0.25em] text-cyan-400">
                          {
                            feature.statLabel
                          }
                        </div>
                      </div>

                      <div className="font-mono text-[7px] text-slate-700">
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      {" / "}
                      04
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          }
        )}

        {/* CENTER LABEL */}

        <div className="pointer-events-none absolute bottom-2 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap text-center">
          <div className="font-mono text-[8px] tracking-[0.35em] text-slate-700">
            {active === 0
              ? "SCROLL TO EXPLORE"
              : active ===
                  features.length - 1
                ? "MODULE COMPLETE"
                : "CONTINUE EXPLORING"}
          </div>
        </div>
      </div>

      {/* PROGRESS */}

      <div className="mx-auto mt-4 flex max-w-xl items-center justify-center gap-2">
        {features.map(
          (feature, index) => (
            <button
              key={feature.number}
              type="button"
              disabled={animating}
              onClick={() =>
                changeCard(index)
              }
              className="group flex items-center gap-2"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                  index === active
                    ? "scale-125 bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                    : "bg-white/10 group-hover:bg-white/30"
                }`}
              />

              <span
                className={`hidden font-mono text-[7px] tracking-[0.2em] sm:block ${
                  index === active
                    ? "text-cyan-400"
                    : "text-slate-700"
                }`}
              >
                {
                  feature.number
                }
              </span>
            </button>
          )
        )}
      </div>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function StaffApplicationForm() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#03060b] text-white selection:bg-cyan-400 selection:text-black">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-screen">
        <Grid />

        <ServerCore />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,#03060b_75%)]" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-20">
          <div className="w-full text-center">
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300">
                System is recruiting
              </span>
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.15,
              }}
              className="mx-auto max-w-5xl text-6xl font-black leading-[0.85] tracking-[-0.07em] sm:text-8xl lg:text-[9.5rem]"
            >
              WE'RE
              <br />

              <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-500 bg-clip-text text-transparent">
                BUILDING.
              </span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 0.6,
              }}
              className="mx-auto mt-8 max-w-xl text-sm leading-7 text-slate-400 sm:text-base"
            >
              Join the people behind the infrastructure
              powering high-performance hosting.
              Build. Break. Learn. Repeat.
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.8,
              }}
              className="mt-9"
            >
              <MagneticButton>
                ENTER THE TEAM
                <span className="ml-2">
                  →
                </span>
              </MagneticButton>
            </motion.div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <div className="flex flex-col items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600">
                <span>
                  Scroll to initialize
                </span>

                <div className="h-10 w-px overflow-hidden bg-white/10">
                  <motion.div
                    animate={{
                      y: [0, 40],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                    }}
                    className="h-1/2 w-full bg-cyan-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATUS
      ===================================================== */}

      <section className="relative border-y border-white/[0.06] bg-white/[0.015]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-4">
          {[
            ["100%", "REMOTE", "First"],
            ["24/7", "TEAM", "Support"],
            ["∞", "GROWTH", "Potential"],
            ["3", "OPEN", "Positions"],
          ].map(
            ([number, status, label]) => (
              <div
                key={label}
                className="border-r border-white/[0.06] px-6 py-10 last:border-r-0"
              >
                <div className="text-3xl font-black tracking-tight text-white">
                  {number}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-cyan-400" />

                  <span className="text-[9px] font-bold tracking-[0.2em] text-cyan-400">
                    {status}
                  </span>
                </div>

                <div className="mt-1 text-xs text-slate-600">
                  {label}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* =====================================================
          POSITIONS
      ===================================================== */}

      <section
        id="positions"
        className="relative mx-auto max-w-7xl px-6 py-32"
      >
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/5 blur-[120px]" />

        <div className="relative">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="mb-16"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs font-black text-cyan-400">
                // 01
              </span>

              <span className="h-px w-12 bg-cyan-400/30" />

              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">
                Open positions
              </span>
            </div>

            <h2 className="text-5xl font-black tracking-[-0.05em] sm:text-7xl">
              SELECT
              <br />

              <span className="text-slate-700">
                YOUR MISSION.
              </span>
            </h2>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-3">
            {jobs.map(
              (job, index) => (
                <motion.a
                  href={job.href}
                  key={job.id}
                  initial={{
                    opacity: 0,
                    y: 60,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-100px",
                  }}
                  transition={{
                    duration: 0.7,
                    delay:
                      index * 0.12,
                  }}
                  whileHover={{
                    y: -12,
                    rotateX: 3,
                    rotateY:
                      index === 1
                        ? 0
                        : index === 0
                          ? -2
                          : 2,
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7 backdrop-blur-xl transition-colors duration-500 hover:border-cyan-400/30 hover:bg-cyan-400/[0.035]"
                  style={{
                    transformStyle:
                      "preserve-3d",
                    perspective: 1000,
                  }}
                >
                  <div className="absolute left-0 right-0 top-0 h-px -translate-x-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-cyan-400">
                      JOB_{job.id}
                    </span>

                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-[9px] font-bold tracking-widest text-emerald-400">
                      OPEN
                    </span>
                  </div>

                  <div className="mt-12">
                    <div className="mb-3 text-[9px] font-bold tracking-[0.3em] text-slate-600">
                      {
                        job.department
                      }
                    </div>

                    <h3 className="text-2xl font-black tracking-tight">
                      {
                        job.title
                      }
                    </h3>

                    <p className="mt-4 text-sm leading-6 text-slate-500">
                      {
                        job.description
                      }
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {job.skills.map(
                      (skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-white/[0.06] px-2.5 py-1.5 text-[8px] font-bold tracking-wider text-slate-500"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>

                  <div className="mt-10 flex items-center justify-between border-t border-white/[0.06] pt-5">
                    <button
                      className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/20"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = job.href;
                      }}
                    >
                      Apply Now
                    </button>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cyan-400 transition-all group-hover:border-cyan-400/40 group-hover:bg-cyan-400 group-hover:text-black">
                      →
                    </span>
                  </div>
                </motion.a>
              )
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          MORE THAN A JOB
      ===================================================== */}

      <section className="relative overflow-hidden border-y border-white/[0.06] bg-[#02050a]">

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.025)_1px,transparent_1px)] bg-[size:80px_80px]" />

          <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.05] blur-[160px]" />

          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-32">

          {/* HEADER */}

          <div className="mb-8 grid items-end gap-8 lg:grid-cols-[1fr_auto]">

            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="font-mono text-xs font-black text-cyan-400">
                  // 02
                </span>

                <span className="h-px w-12 bg-cyan-400/30" />

                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">
                  Why Caspian Host
                </span>
              </div>

              <h2 className="text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                MORE THAN
                <br />

                <span className="text-slate-700">
                  A JOB.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-slate-500 sm:text-base lg:pb-2">
              You're not joining another company where
              your work disappears into a spreadsheet.
              You're joining a team where what you build
              actually matters.
            </p>
          </div>

          {/* SLIDER */}

          <ThreeDFeatureSlider />

        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="relative overflow-hidden px-6 py-32">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[130px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
            // Final checkpoint
          </div>

          <h2 className="text-5xl font-black tracking-[-0.06em] sm:text-7xl">
            READY TO
            <br />

            <span className="text-slate-700">
              CONNECT?
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-slate-500">
            Find a position that fits your skills and become part of
            the team building Caspian Host.
          </p>

          <div className="mt-9">
            <MagneticButton>
              ENTER THE TEAM
              <span className="ml-2">
                →
              </span>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-white/[0.06]">

        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-[10px] uppercase tracking-[0.2em] text-slate-700 sm:flex-row sm:items-center sm:justify-between">

          <span>
            © {new Date().getFullYear()} CASPIAN HOST
          </span>

          <span>
            SYSTEM STATUS:{" "}
            <span className="text-emerald-500">
              OPERATIONAL
            </span>
          </span>

        </div>

      </footer>
    </main>
  );
}