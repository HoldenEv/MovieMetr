"use client";

import Login from "@/_ui/components/UserAuth/Login/Login";
import { useState } from "react";

export default function LoginPage() {
  const [isOpen, setOpen] = useState(true);

  return <Login isOpen={isOpen} setOpenState={setOpen} />;
}
