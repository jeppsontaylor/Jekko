# Jnoccio Fusion — Encrypted Source

This directory is encrypted with [git-crypt](https://github.com/AGWA/git-crypt).
Without the decryption key, files appear as binary ciphertext.

## For authorized developers / open-source users

1. **Obtain the decryption key** from a project maintainer (out-of-band).
2. **Install git-crypt**:
   ```bash
   # macOS
   brew install git-crypt

   # Ubuntu / Debian
   sudo apt-get install git-crypt

   # Arch
   pacman -S git-crypt
   ```
3. **Unlock the repository**:
   ```bash
   git-crypt unlock /path/to/jnoccio-fusion.key
   ```
4. Files under `jnoccio-fusion/` are now readable and editable as normal.
5. Commit and push normally — encryption happens transparently through the
   git clean/smudge filter defined in `.gitattributes`.

## For contributors without the key

You can clone, build, and contribute to all other parts of the repository.
The `jnoccio-fusion/` files will appear as binary data and cannot be read
or modified. This is by design.

## Important notes

- **Filenames are visible.** git-crypt encrypts file _contents_, not names.
- **Commit messages are visible.** Do not put sensitive information in commit messages.
- **The key must never be committed to Git.** It is distributed out-of-band only.
- **Old history remains decryptable** if the key is ever leaked. git-crypt does
  not support key rotation for existing history.

## Troubleshooting

### Files appear as binary after pulling
Run `git-crypt unlock /path/to/key`. The smudge filter will decrypt on checkout.

### CI fails with "PLAINTEXT DETECTED"
The git-crypt filter was not active when you committed. Fix with:
```bash
git-crypt unlock /path/to/key
git rm --cached jnoccio-fusion/<file>
git add jnoccio-fusion/<file>
git commit --amend
```

### Cannot build the Rust crate
`Cargo.toml` and all `.rs` source files are encrypted. You need the key to
compile jnoccio-fusion.

### Merge conflicts in encrypted files
Make sure `git-crypt unlock` has been run before merging. When unlocked, the
filter decrypts transparently and standard merge resolution works. If you see
binary conflict markers, unlock first then retry the merge.

### Adding a new file to jnoccio-fusion/
New files are automatically covered by the `.gitattributes` rule
`jnoccio-fusion/** filter=git-crypt diff=git-crypt`. Just `git add` as normal
after unlocking.
