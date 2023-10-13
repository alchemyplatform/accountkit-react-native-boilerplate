import { LightSmartContractAccount } from "@alchemy/aa-accounts";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { EntryPointAbi, SmartAccountSigner } from "@alchemy/aa-core";
import { useCallback, useState } from "react";
import {
  alchemyRpcUrl,
  chain,
  gasManagerPolicyId,
  lightAccountFactoryAddress,
} from "shared/config/env";
import { Address, getContract } from "viem";

type AlchemyProviderProps = {
  entryPointAddress: Address;
};

export const useAlchemyProvider = ({
  entryPointAddress,
}: AlchemyProviderProps) => {
  const [provider, setProvider] = useState<AlchemyProvider>(
    new AlchemyProvider({
      chain,
      entryPointAddress,
      rpcUrl: alchemyRpcUrl,
    }),
  );

  console.log("entryPointAddress !!!!!!!!!!!!!!", entryPointAddress);
  const entryPoint = getContract({
    address: entryPointAddress,
    abi: EntryPointAbi,
    // Need to cast this as PublicClient or else it breaks ABI typing.
    // This is valid because our PublicClient is a subclass of PublicClient
    publicClient: provider.rpcClient,
  });
  console.log("entryPoint", entryPoint);

  const connectProviderToAccount = useCallback(
    (signer: SmartAccountSigner, account?: Address) => {
      console.log(signer.signerType, account);
      const connectedProvider = provider
        .connect((rpcClient) => {
          console.log(`Connecting account ${account} to alchemy provider`);
          const a = new LightSmartContractAccount({
            rpcClient,
            owner: signer,
            chain,
            entryPointAddress,
            factoryAddress: lightAccountFactoryAddress,
            accountAddress: account,
          });
          console.log("?????????", a);
          return a;
        })
        .withAlchemyGasManager({
          policyId: gasManagerPolicyId,
          entryPoint: entryPointAddress,
        });

      console.log("?????????");
      setProvider(connectedProvider);

      console.log(
        "[useAlchemyProvider] Alchemy Provider connected to account %s \
          (Signer type %s, Gas Manager Policy ID %s, Entry Point Address %s, Factory Address %s)",
        connectedProvider.account,
        signer.signerType,
        gasManagerPolicyId,
        entryPointAddress,
        lightAccountFactoryAddress,
      );

      return connectedProvider;
    },
    [entryPointAddress, provider],
  );

  const disconnectProviderFromAccount = useCallback(() => {
    const disconnectedProvider = provider.disconnect();

    setProvider(disconnectedProvider);
    return disconnectedProvider;
  }, [provider]);

  return { provider, connectProviderToAccount, disconnectProviderFromAccount };
};
