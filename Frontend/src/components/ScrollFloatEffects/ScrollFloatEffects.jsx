import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PUBLIC_ROUTE_PATTERNS = [
  /^\/$/,
  /^\/projects$/,
  /^\/project\/[^/]+$/,
  /^\/forinvestors$/,
];

const TARGET_SELECTOR = [
  "section",
  "article",
  "img",
  "h1",
  "h2",
  "h3",
  "p",
  "button",
].join(", ");

const ScrollFloatEffects = () => {
  const location = useLocation();

  useEffect(() => {
    const isPublicRoute = PUBLIC_ROUTE_PATTERNS.some((pattern) =>
      pattern.test(location.pathname)
    );

    if (!isPublicRoute) {
      return undefined;
    }

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const shell = document.getElementById("page-shell");

    if (!shell) {
      return undefined;
    }

    const elements = Array.from(shell.querySelectorAll(TARGET_SELECTOR)).filter(
      (element) => {
        if (element.closest("header, footer, nav, [data-no-float]")) {
          return false;
        }

        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      }
    );

    elements.forEach((element, index) => {
      element.classList.add("scroll-float-target");
      element.style.setProperty(
        "--scroll-float-delay",
        `${Math.min(index % 6, 5) * 70}ms`
      );
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-float-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();

      elements.forEach((element) => {
        element.classList.remove("scroll-float-target");
        element.classList.remove("scroll-float-in");
        element.style.removeProperty("--scroll-float-delay");
      });
    };
  }, [location.pathname]);

  return null;
};

export default ScrollFloatEffects;
