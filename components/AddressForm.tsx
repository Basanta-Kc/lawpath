'use client'

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addressSchema, AddressInput } from '@/lib/schema';
import { Loader2 } from 'lucide-react';
import { australianStates } from '@/lib/constants';

interface AddressFormProps {
  onSubmit: SubmitHandler<AddressInput>;
  isLoading: boolean;
}

export function AddressForm({ onSubmit, isLoading }: AddressFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, trigger } = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
        <Input
          id="postcode"
          {...register('postcode')}
          placeholder="Enter 4-digit postcode"
          className="w-full"
          aria-invalid={errors.postcode ? "true" : "false"}
          aria-describedby="postcode-error"
        />
        {errors.postcode && (
          <p id="postcode-error" className="text-red-500 text-sm mt-1" role="alert">{errors.postcode.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="suburb" className="block text-sm font-medium text-gray-700 mb-1">Suburb</label>
        <Input
          id="suburb"
          {...register('suburb')}
          placeholder="Enter suburb name"
          className="w-full"
          aria-invalid={errors.suburb ? "true" : "false"}
          aria-describedby="suburb-error"
        />
        {errors.suburb && (
          <p id="suburb-error" className="text-red-500 text-sm mt-1" role="alert">{errors.suburb.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
        <Select onValueChange={(value) => { setValue('state', value); trigger('state'); }}>
          <SelectTrigger id="state" className="w-full bg-white">
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {australianStates.map((state) => (
              <SelectItem key={state.value} value={state.value} className="hover:bg-gray-100">
                {state.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.state && (
          <p id="state-error" className="text-red-500 text-sm mt-1" role="alert">{errors.state.message}</p>
        )}
      </div>
      <Button 
        type="submit" 
        className="w-full bg-primary text-white hover:bg-primary/90 transition-colors"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Validating...
          </>
        ) : (
          'Validate Address'
        )}
      </Button>
    </form>
  );
}

