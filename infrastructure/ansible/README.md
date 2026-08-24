# Ansible deployment

Deploys the containerized monolith (`infrastructure/docker-compose.prod.yml`)
to a fresh Ubuntu 24.04 machine: installs Docker, syncs the repository,
writes `.env`, builds, starts the stack, and optionally keeps a DuckDNS
record updated.

## Local VPS emulation

One-time setup (Linux, KVM-based — no VirtualBox needed):

```bash
sudo apt install qemu-kvm libvirt-daemon-system libvirt-clients virtinst
sudo usermod -aG libvirt,kvm $USER   # log out/in afterwards
vagrant plugin install vagrant-libvirt
```

Then:

```bash
vagrant up --provider=libvirt
```

The Vagrantfile provisions the VM through this playbook in
`deploy_mode=emulation` (plain HTTP on forwarded port 8080, throwaway
database credentials). Open <http://localhost:8080> when provisioning
finishes.

> Registry quirk: since Vagrant Cloud's move to the HCP portal, box
> downloads sometimes need explicit flags:
> `vagrant box add bento/ubuntu-24.04 --provider=libvirt --architecture=amd64`

## Real server

1. Copy the example inventory:

   ```bash
   cp infrastructure/ansible/inventory/production.ini.example \
      infrastructure/ansible/inventory/production.ini
   ```

2. Fill in your VPS IP or hostname.
3. Run:

   ```bash
   ansible-playbook -i infrastructure/ansible/inventory/production.ini \
     infrastructure/ansible/playbook.yml \
     -e deploy_mode=production \
     -e domain=yourname.duckdns.org \
     -e db_password='...' \
     -e jwt_secret='...' \
     -e duckdns_domain=yourname \
     -e duckdns_token='...'
   ```

`duckdns_*` are optional; omit them if you do not use DuckDNS. Caddy then
terminates TLS automatically via Let's Encrypt for `$DOMAIN`.
