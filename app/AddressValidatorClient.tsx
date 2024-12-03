"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { AddressForm } from "@/components/AddressForm";
import { ValidationResult } from "@/components/ValidationResult";
import { VALIDATE_ADDRESS } from "@/lib/queries";
import {
  AddressInput,
  ValidationResult as ValidationResultType,
} from "@/lib/schema";

export default function AddressValidatorClient() {
  const [addressInput, setAddressInput] = useState<AddressInput | null>(null);

  const { data, loading, error } = useQuery<
    { validateAddress: ValidationResultType },
    AddressInput
  >(VALIDATE_ADDRESS, {
    variables: addressInput || { postcode: "", suburb: "", state: "" },
    skip: !addressInput,
    fetchPolicy: "no-cache"
  });

  const onSubmit = (data: AddressInput) => {
    setAddressInput(data);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <AddressForm onSubmit={onSubmit} isLoading={loading} />
      {error && (
        <div
          className="mt-4 p-4 rounded-md bg-red-100 text-red-700 border border-red-400"
          role="alert"
          aria-live="assertive"
        >
          An error occurred while validating the address. Please try again.
        </div>
      )}
      {data && <ValidationResult result={data.validateAddress} />}
    </div>
  );
}
