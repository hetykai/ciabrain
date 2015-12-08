from setuptools import setup, find_packages

setup(
    name='ciabrain',
    version='1.0.0',
    packages=find_packages(exclude=['doc']),
    author='qisc',
    author_email='783814127@qq.com',
    description='nnet',
    install_requires = ["scipy"]
)