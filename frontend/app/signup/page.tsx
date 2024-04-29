"use client";

import Signup from "@/_ui/components/Signup/Signup";
import { useState } from "react";

export default function SignupPage() {
  const [isOpen, setOpen] = useState(true);

  return <Signup isOpen={isOpen} setOpenState={setOpen} />;
}
