from django.db import models

# Create your models here.
class DigDeeper1(models.Model):
    question = models.TextField('Question', max_length=400, null=True, blank=False)
    image = models.CharField('Image', max_length=500, null=True, blank=False)

    class Meta:
        db_table = 'DigDeeper1'

    def __str__(self):
        return self.question

class DigDeeper2(models.Model):
    question = models.TextField('Question', max_length=400, null=True, blank=False)
    image = models.CharField('Image', max_length=500, null=True, blank=False)

    class Meta:
        db_table = 'DigDeeper2'

    def __str__(self):
        return self.question

class DigDeeper3(models.Model):
    question = models.TextField('Question', max_length=400, null=True, blank=False)
    image = models.CharField('Image', max_length=500, null=True, blank=False)

    class Meta:
        db_table = 'DigDeeper3'

    def __str__(self):
        return self.question

class IceBreak(models.Model):
    question = models.TextField('Question', max_length=400, null=True, blank=False)
    image = models.CharField('Image', max_length=500, null=True, blank=False)

    class Meta:
        db_table = 'IceBreak'

    def __str__(self):
        return self.question

class Perspective(models.Model):
    question = models.TextField('Question', max_length=400, null=True, blank=False)
    image = models.CharField('Image', max_length=500, null=True, blank=False)

    class Meta:
        db_table = 'Perspective'

    def __str__(self):
        return self.question

class Lovebirds(models.Model):
    question = models.TextField('Question', max_length=400, null=True, blank=False)
    image = models.CharField('Image', max_length=500, null=True, blank=False)

    class Meta:
        db_table = 'Lovebirds'

    def __str__(self):
        return self.question

class Stranger(models.Model):
    question = models.TextField('Question', max_length=400, null=True, blank=False)
    image = models.CharField('Image', max_length=500, null=True, blank=False)

    class Meta:
        db_table = 'Stranger'

    def __str__(self):
        return self.question

class MixNMatch(models.Model):
    question = models.TextField('Question', max_length=400, null=True, blank=False)
    image = models.CharField('Image', max_length=500, null=True, blank=False)

    class Meta:
        db_table = 'MixNMatch'

    def __str__(self):
        return self.question

class Report(models.Model):
    questionID = models.TextField('id', max_length=500, null=True, blank=False)
    question = models.TextField('Question', max_length=500, null=True, blank=False)
    pack = models.TextField('Pack', max_length=500, null=True, blank=False)
    report = models.TextField('Issue', max_length=300, null=True, blank=False)
    desc = models.TextField('Description', max_length=900, null=True, blank=False)

    class Meta:
        db_table = 'Report'

    def __str__(self):
        return self.report

class GameplayRecord(models.Model):
    player = models.CharField('Player', max_length=100, null=True, blank=True)
    pack = models.CharField('Pack', max_length=200, null=True, blank=True)
    numOfCards = models.IntegerField('Number of Cards', null=True, blank=False)
    dateTime = models.DateTimeField('Time', auto_now_add=True, null=True, blank=False)

    class Meta:
        db_table = 'GameplayRecord'

    def __str__(self):
        return self.pack