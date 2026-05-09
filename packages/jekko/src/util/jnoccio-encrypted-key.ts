export type JnoccioEncryptedGitCryptKeyEnvelope = {
  version: 1
  kdf: "scrypt"
  cipher: "aes-256-gcm"
  salt: string
  iv: string
  tag: string
  ciphertext: string
  params: {
    N: number
    r: number
    p: number
    maxmem: number
  }
  aad: "jnoccio-fusion-git-crypt-key-v1"
}

export const JNOCCIO_ENCRYPTED_GIT_CRYPT_KEY = {
  "version": 1,
  "kdf": "scrypt",
  "cipher": "aes-256-gcm",
  "salt": "j0EpRuzohJFnisZITPnBBg",
  "iv": "6G0k9tivyLhZkdV6",
  "tag": "nM-iuNdfrJLhcsQC2wl8Qg",
  "ciphertext": "QT85aIb-K6gfF_a3zxzj-0tTLWsyaXoPSC2q0TEJYrhVS9JyxIo8s2GWjhftmeMLHWOUS5f-T4HKDNdwdk71_E47EO7tEMHlL1G50w6X7CBtu3PHpwIfP1vGtf0Tia9VECeiwtG0kKCsVjFTXkW4TpDCM1hl70jBymAcBichTyhjtMGTywFj3Tk3_u9g5WZ-1PJNDg",
  "params": {
    "N": 262144,
    "r": 8,
    "p": 1,
    "maxmem": 536870912
  },
  "aad": "jnoccio-fusion-git-crypt-key-v1"
} as const satisfies JnoccioEncryptedGitCryptKeyEnvelope
