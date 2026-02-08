"use client";

type ErrorProps = {
  error: Error;
};

export default function Error({ error }: ErrorProps) {
  return <p>Failed to load note: {error.message}</p>;
}
