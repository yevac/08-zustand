"use client";

type ErrorProps = {
  error: Error;
};


export default function Error({ error }: ErrorProps) {
  return <p>Something went wrong: {error.message}</p>;
}
