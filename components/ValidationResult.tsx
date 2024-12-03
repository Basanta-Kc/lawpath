import { ValidationResult as ValidationResultType } from '@/lib/schema';

interface ValidationResultProps {
  result: ValidationResultType;
}

export function ValidationResult({ result }: ValidationResultProps) {
  return (
    <div 
      className={`mt-4 p-4 rounded-md ${
        result.isValid 
          ? 'bg-green-100 text-green-700 border border-green-400' 
          : 'bg-red-100 text-red-700 border border-red-400'
      }`}
      role="alert"
      aria-live="polite"
    >
      {result.message}
    </div>
  );
}

