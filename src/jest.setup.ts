import { Response as NodeFetchResponse } from "node-fetch";
import "whatwg-fetch";

declare global {
  interface Response extends NodeFetchResponse {}
  // Możesz też rozszerzyć interfejs Request i RequestInit, jeśli to konieczne
}

globalThis.fetch = fetch as any; // Rzutujemy fetch na any, aby uniknąć problemów z typami

// Importuj inne rzeczy, które mogą być potrzebne w konfiguracji środowiska testowego
import "@testing-library/jest-dom";
// ...
