FROM debian:trixie

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
  && apt-get install --yes --no-install-recommends \
    ca-certificates \
    curl \
    git \
    less \
    nano \
    openssh-client \
    procps \
    sqlite3 \
    unzip \
    vim-tiny \
  && rm -rf /var/lib/apt/lists/*

RUN groupadd --gid 1000 dev \
  && useradd \
    --uid 1000 \
    --gid dev \
    --create-home \
    --shell /bin/bash \
    --no-log-init \
    dev

USER dev
