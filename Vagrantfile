# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "bento/ubuntu-24.04"
  config.vm.hostname = "knowledge-management-app-vm"

  config.vm.network "forwarded_port", guest: 8080, host: 8080

  config.vm.provider "libvirt" do |lv|
    lv.title = "knowledge-management-app-vps"
    lv.cpus = 2
    lv.memory = 4096
  end

  config.vm.provision "ansible_local" do |ansible|
    ansible.playbook = "infrastructure/ansible/playbook.yml"
    ansible.inventory_path = "infrastructure/ansible/inventory/vagrant.ini"
    ansible.extra_vars = {
      deploy_mode: "emulation",
    }
  end
end
