import { useEffect, useRef } from "react";

interface JsonLdProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ schema }: JsonLdProps) {
  const scriptsRef = useRef<HTMLScriptElement[]>([]);

  useEffect(() => {
    // Clean up previous scripts
    scriptsRef.current.forEach((s) => s.remove());
    scriptsRef.current = [];

    const schemas = Array.isArray(schema) ? schema : [schema];
    schemas.forEach((s) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(s);
      document.head.appendChild(script);
      scriptsRef.current.push(script);
    });

    return () => {
      scriptsRef.current.forEach((s) => s.remove());
      scriptsRef.current = [];
    };
  }, [schema]);

  return null;
}